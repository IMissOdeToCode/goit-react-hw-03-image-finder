import { Component } from 'react';

import PokemonErrorView from './PokemonErrorView';
import PokemonDataView from './PokemonDataView';
import PokemonPendingView from './PokemonPendingView';
import fetchPokemon from './fetchPokemon';

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_RESOLVED,
} from './status';

class PokemonInfo extends Component {
  state = { pokemon: null, loading: false, error: null, status: STATUS_IDLE };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName && nextName !== '') {
      this.setState({ status: STATUS_PENDING });

      setTimeout(() => {
        fetchPokemon(this.props.pokemonName)
          .then(pokemon => this.setState({ pokemon, status: STATUS_RESOLVED }))
          .catch(error => this.setState({ error, status: STATUS_REJECTED }));
      }, 1000);
    }
  }

  render() {
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;

    if (status === STATUS_IDLE) {
      return <div>Type Pokemon name!</div>;
    }

    if (status === STATUS_PENDING) {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }

    if (status === STATUS_REJECTED) {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === STATUS_RESOLVED) {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}

export default PokemonInfo;
