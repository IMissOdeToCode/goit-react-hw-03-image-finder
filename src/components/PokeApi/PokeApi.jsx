import { Component } from 'react';

class PokeApi extends Component {
  state = {
    pokemon: null,
    loading: false,
  };

  componentDidMount() {}

  render() {
    const { pokemon, loading } = this.state;
    return (
      <>
        <div>{loading && <h1>Loading...</h1>}</div>
        <div>{this.state.pokemon && <div>{pokemon.name}</div>}</div>
      </>
    );
  }
}

export default PokeApi;
