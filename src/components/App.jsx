import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './ImageFinder/Searchbar';
import ImageGallery from './ImageFinder/ImageGallery';

class App extends Component {
  state = { query: '' };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={query} />

        <ToastContainer />
      </>
    );
  }
}

export default App;
