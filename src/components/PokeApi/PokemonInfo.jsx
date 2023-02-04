import { Component } from 'react';

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

    if (prevName !== nextName) {
      this.setState({ status: STATUS_PENDING });

      fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`No ${this.props.pokemonName} pokemon here`)
          );
        })
        .then(pokemon => this.setState({ pokemon, status: STATUS_RESOLVED }))
        .catch(error => this.setState({ error, status: STATUS_REJECTED }));
    }
  }

  render() {
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;

    if (status === STATUS_IDLE) {
      return <div>Type Pokemon name!</div>;
    }

    if (status === STATUS_PENDING) {
      return <div>Loading...</div>;
    }

    if (status === STATUS_REJECTED) {
      return <div>{error.message}</div>;
    }

    if (status === STATUS_RESOLVED) {
      return (
        <div>
          <p>{pokemon.name}</p>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt=""
            width="240"
          />
        </div>
      );
    }
  }
}

export default PokemonInfo;
