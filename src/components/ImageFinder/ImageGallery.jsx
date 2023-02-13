import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from './Modal';
import DetailedImage from './DetailedImage';
import finder from './finder';
import Loader from './Loader';

import PropTypes from 'prop-types';

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_RESOLVED,
  STATUS_EMPTY,
} from './status';

import css from './styles.module.css';

class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    error: null,
    status: STATUS_IDLE,
    showModal: false,
    detailedImageURL: null,
    canLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const IMAGE_PER_PAGE = 12;
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const isQueryChanged = prevQuery !== nextQuery && nextQuery !== '';
    const isPageChanged =
      prevState.page !== this.state.page && this.state.page > prevState.page;

    if (isQueryChanged || isPageChanged) {
      if (isQueryChanged) {
        this.setState({ status: STATUS_PENDING });
      }

      finder(nextQuery, isQueryChanged ? 1 : this.state.page)
        .then(images => {
          if (images.hits.length >= IMAGE_PER_PAGE) {
            this.setState({ canLoadMore: true });
          } else {
            this.setState({ canLoadMore: false });
          }

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
          console.log('finally');
        });
    }
  }

  handleNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showPost = largeImageURL => {
    this.setState({ detailedImageURL: largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, detailedImageURL: null });
  };

  render() {
    const { handleNextPage, showPost, closeModal } = this;
    const { error, status, detailedImageURL, showModal, canLoadMore } =
      this.state;
    const images = this.state.data;

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
            showPost={showPost}
            key={image.id}
            image={image}
          />
        );
      });
      return (
        <>
          <div className={css.galleryContainer}>
            <ul className={css.ImageGallery}>{items}</ul>
            {canLoadMore && (
              <button
                className={css.Button}
                onClick={handleNextPage}
              >
                MORE PICTURES
              </button>
            )}
            {showModal && (
              <Modal close={closeModal}>
                <DetailedImage largeImageURL={detailedImageURL} />
              </Modal>
            )}
          </div>
        </>
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
