import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import PokeApi from './PokeApi/PokeApi';
import PokemonForm from './PokeApi/PokemonForm';
import PokemonInfo from './PokeApi/PokemonInfo';

class App extends Component {
  state = { pokemonName: '' };

  handleFormSubmit = pokemonName => {
    this.setState({ pokemonName });
  };

  render() {
    const { pokemonName } = this.state;

    return (
      <>
        <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName={pokemonName} />
        <ToastContainer />
      </>
    );
  }
}

export default App;
