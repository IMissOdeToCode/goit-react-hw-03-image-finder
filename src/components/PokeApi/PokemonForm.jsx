import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

const styles = { form: { marginBottom: 20 } };

class PokemonForm extends Component {
  state = {
    pokemonName: '',
  };

  handleChange = event => {
    this.setState({ pokemonName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.pokemonName);
    if (this.state.pokemonName.trim() === '') {
      return toast.warn('🦄 empty search field!');
    }

    this.setState({ pokemonName: '' });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={styles.form}
      >
        <input
          type="text"
          name="pokemonName"
          value={this.state.pokemonName}
          onChange={this.handleChange}
        />
        <button type="submit">
          <ImSearch style={{ margiRight: 0 }} />
          Find
        </button>
      </form>
    );
  }
}

export default PokemonForm;
