import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './ImageFinder/Searchbar';
import Gallery from './ImageFinder/Gallery';
import Button from './ImageFinder/Button';
import Loader from './ImageFinder/Loader';

import Modal from './ImageFinder/Modal';
import DetailedImage from './ImageFinder/DetailedImage';

import searchImages from './ImageFinder/pixabay-api';

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_RESOLVED,
  STATUS_EMPTY,
} from './ImageFinder/status';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: null,
    status: STATUS_IDLE,
    detailedImageURL: null,
    isModalShow: false,
    isLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;

    const isQueryChanged = prevQuery !== query && query !== '';
    const isPageChanged = prevPage !== page && page > prevPage;

    if (isQueryChanged || isPageChanged) {
      if (isQueryChanged) {
        this.setState({ status: STATUS_PENDING });
      }

      searchImages(query, isQueryChanged ? 1 : page)
        .then(data => {
          if (data.hits.length >= 12) {
            this.setState({ isLoadMore: true });
          } else {
            this.setState({ isLoadMore: false });
          }

          if (data.hits.length === 0) {
            console.log('empty');
            this.setState({
              status: STATUS_EMPTY,
              error: new Error(`${query}`),
            });
            return;
          }

          this.setState(
            ({ images }) => ({
              ...(isQueryChanged
                ? { page: 1, images: data.hits }
                : { images: [...images, ...data.hits] }),
              status: STATUS_RESOLVED,
            }),
            () => isQueryChanged && window.scrollTo(0, 0)
          );
        })
        // .catch(console.log('this is catch'))
        .finally();
    }
  }

  handleNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showLargeImage = largeImageURL => {
    this.setState({ detailedImageURL: largeImageURL, isModalShow: true });
  };

  closeModal = () => {
    this.setState({ isModalShow: false, detailedImageURL: null });
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { images, isModalShow, detailedImageURL, isLoadMore, status, error } =
      this.state;
    const { closeModal, showLargeImage, handleNextPage } = this;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === STATUS_PENDING && <Loader />}

        {(status === STATUS_EMPTY || status === STATUS_REJECTED) && (
          <p>
            There is no <strong>{error.message}</strong> images...
          </p>
        )}

        <Gallery
          images={images}
          showLargeImage={showLargeImage}
        />
        {isLoadMore && <Button handleNextPage={handleNextPage} />}

        {isModalShow && (
          <Modal close={closeModal}>
            <DetailedImage largeImageURL={detailedImageURL} />
          </Modal>
        )}

        <ToastContainer />
      </>
    );
  }
}

export default App;
