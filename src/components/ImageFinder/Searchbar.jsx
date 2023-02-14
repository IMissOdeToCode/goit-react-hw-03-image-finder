import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import css from './styles.module.css';

class Searchbar extends Component {
  state = { query: '' };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log('Searchbar result', this.state.query);
    if (this.state.query.trim() === '') {
      return toast.warn('🦄 empty search field!');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });

    // if (this.state.query.trim() === '') {
    //   return toast.warn('🦄 empty search field!');
    // }
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form
          onSubmit={this.handleSubmit}
          className={css.SearchForm}
        >
          <button
            type="submit"
            className={css.SearchFormButton}
          >
            <ImSearch style={{ margiRight: 0 }} />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.query}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
