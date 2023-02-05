import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import PokeApi from './PokeApi/PokeApi';
// import PokemonForm from './PokeApi/PokemonForm';
// import PokemonInfo from './PokeApi/PokemonInfo';

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
        {/* <PokemonForm onSubmit={this.handleFormSubmit} /> */}
        {/* <PokemonInfo pokemonName={pokemonName} /> */}

        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={query} />

        <ToastContainer />
      </>
    );
  }
}

export default App;
