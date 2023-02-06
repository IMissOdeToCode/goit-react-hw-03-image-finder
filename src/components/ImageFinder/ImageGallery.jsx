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
// import fileData from './data';

import css from './styles.module.css';

class ImageGallery extends Component {
  //   state = { data: data };
  state = { data: [], page: 1, error: null, status: STATUS_IDLE };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const isQueryChanged = prevQuery !== nextQuery && nextQuery !== '';
    const isPageChanged =
      prevState.page !== this.state.page && this.state.page > prevState.page;

    console.log('isQueryChanged', isQueryChanged);

    if (isQueryChanged || isPageChanged) {
      console.log('componentDidUpdate');

      if (isQueryChanged) {
        this.setState({ status: STATUS_PENDING });
      }

      finder(nextQuery, isQueryChanged ? 1 : this.state.page)
        .then(images => {
          // console.log('images:', images);

          if (!images.total) {
            return this.setState({
              status: STATUS_EMPTY,
              error: new Error(`There is no ${nextQuery} images`),
            });
          }

          this.setState(
            ({ data }) => ({
              ...(isQueryChanged
                ? { page: 1, data: images.hits }
                : { data: [...data, ...images.hits] }),
              status: STATUS_RESOLVED,
            }),
            () => isQueryChanged && window.scrollTo(0, 0)
          );
        })
        .catch(error => this.setState({ error, status: STATUS_REJECTED }))
        .finally(() => {
          console.log('finnaly');
        });
    }
  }

  handleNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    console.log('handleNextPage:', this.state.page);
  };

  render() {
    const { error, status } = this.state;
    const images = this.state.data;

    // console.log('images in render', images);

    if (status === STATUS_PENDING) {
      return <Loader />;
    }

    if (status === STATUS_EMPTY || status === STATUS_REJECTED) {
      return <p>{error.message}</p>;
    }

    if (status === STATUS_RESOLVED) {
      // console.log(images);
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
