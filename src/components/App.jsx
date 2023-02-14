import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './ImageFinder/Searchbar';
import Gallery from './ImageFinder/ImageGallery';
import Button from './ImageFinder/Button';
import Loader from './ImageFinder/Loader';
import Modal from './ImageFinder/Modal';
import DetailedImage from './ImageFinder/DetailedImage';

import searchImages from './ImageFinder/pixabay-api';

import initialState from './ImageFinder/initialState';

import {
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_RESOLVED,
  STATUS_EMPTY,
  PER_PAGE,
} from './ImageFinder/constants';

class App extends Component {
  state = initialState;

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;

    const isQueryChanged = prevQuery !== query;
    const isPageChanged = prevPage !== page;
    const condition = isQueryChanged || isPageChanged;

    if (condition) {
      if (isQueryChanged) {
        this.setState({ status: STATUS_PENDING });
      }

      searchImages(query, page)
        .then(data => {
          if (data.hits.length === 0) {
            this.setState({
              status: STATUS_EMPTY,
              error: new Error(`${query}`),
            });
            return;
          }

          const canLoadMore = Boolean(
            Math.ceil(page < data.totalHits / PER_PAGE)
          );
          this.setState(({ images }) => ({
            images: [...images, ...data.hits],
            status: STATUS_RESOLVED,
            isLoadMore: canLoadMore,
          }));
        })
        .catch(err => {
          if (err.response.status === 404) {
            console.log('Resource could not be found!');
          } else {
            this.setState({ error: err, status: STATUS_REJECTED });
          }
        })
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
    this.setState({
      ...initialState,
      query,
    });
  };

  render() {
    const { images, isModalShow, detailedImageURL, isLoadMore, status, error } =
      this.state;
    const { closeModal, showLargeImage, handleNextPage } = this;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === STATUS_PENDING && <Loader />}

        {status === STATUS_EMPTY && (
          <p>
            There is no <strong>{error.message}</strong> images. Try searching
            cat images
          </p>
        )}

        {status === STATUS_REJECTED && <p>{error.message}</p>}

        {status === STATUS_RESOLVED && (
          <Gallery
            images={images}
            showLargeImage={showLargeImage}
          />
        )}

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
