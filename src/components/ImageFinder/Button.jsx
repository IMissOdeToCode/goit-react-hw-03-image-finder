import PropTypes from 'prop-types';

import css from './styles.module.css';

const Button = ({ handleNextPage }) => {
  return (
    <button
      className={css.Button}
      onClick={handleNextPage}
    >
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  handleNextPage: PropTypes.func.isRequired,
};
