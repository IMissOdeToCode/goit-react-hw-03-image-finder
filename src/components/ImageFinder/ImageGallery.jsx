import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import finder from './finder';

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_RESOLVED,
  STATUS_EMPTY,
} from './status';
// import data from './data';

import css from './styles.module.css';

class ImageGallery extends Component {
  //   state = { data: data };
  state = { data: {}, error: null, status: STATUS_IDLE };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery && nextQuery !== '') {
      this.setState({ status: STATUS_PENDING });

      finder(nextQuery, 1)
        .then(images => {
          if (!images.total) {
            return this.setState({
              status: STATUS_EMPTY,
              error: new Error(`There is no ${nextQuery} images`),
            });
          }
          this.setState({ data: images, status: STATUS_RESOLVED });
        })
        .catch(error => this.setState({ error, status: STATUS_REJECTED }))
        .finally(() => {
          console.log('finnaly');
        });
    }
  }

  render() {
    const { error, status } = this.state;
    const images = this.state.data.hits;

    if (status === STATUS_EMPTY || status === STATUS_REJECTED) {
      return <p>{error.message}</p>;
    }

    if (status === STATUS_RESOLVED) {
      const items = images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
          />
        );
      });
      return (
        <>
          <ul className={css.ImageGallery}>{items}</ul>
          <button>MORE PICTURES</button>
        </>
      );
    }
  }
}

export default ImageGallery;
