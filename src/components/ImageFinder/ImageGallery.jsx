import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import finder from './finder';
import Loader from './Loader';

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
  state = { data: {}, page: 1, error: null, status: STATUS_IDLE };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (
      (prevQuery !== nextQuery && nextQuery !== '') ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: STATUS_PENDING });

      setTimeout(() => {
        finder(nextQuery, this.state.page)
          .then(images => {
            console.log(images.hits);
            if (!images.total) {
              return this.setState({
                status: STATUS_EMPTY,
                error: new Error(`There is no ${nextQuery} images`),
              });
            }
            this.setState(({ data }) => ({
              data: { ...data, ...images },
              status: STATUS_RESOLVED,

              // { data: images, status: STATUS_RESOLVED }
            }));
          })
          .catch(error => this.setState({ error, status: STATUS_REJECTED }))
          .finally(() => {
            console.log('finnaly');
          });
      }, 1000);

      //   finder(nextQuery, 1)
      //     .then(images => {
      //       if (!images.total) {
      //         return this.setState({
      //           status: STATUS_EMPTY,
      //           error: new Error(`There is no ${nextQuery} images`),
      //         });
      //       }
      //       this.setState({ data: images, status: STATUS_RESOLVED });
      //     })
      //     .catch(error => this.setState({ error, status: STATUS_REJECTED }))
      //     .finally(() => {
      //       console.log('finnaly');
      //     });
    }
  }

  handleNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    console.log('handleNextPage:', this.state.page);
  };

  render() {
    const { error, status } = this.state;
    const images = this.state.data.hits;

    if (status === STATUS_PENDING) {
      return <Loader />;
    }

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
          <button onClick={this.handleNextPage}>MORE PICTURES</button>
        </>
      );
    }
  }
}

export default ImageGallery;
