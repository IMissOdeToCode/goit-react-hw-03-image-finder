import { ImSpinner } from 'react-icons/im';
import css from './styles.module.css';

const Loader = () => {
  return (
    <div role="alert">
      <div className={css.LoaderBox}>
        <ImSpinner
          className="icon-spin"
          size="64"
          color="3f51b5"
        />
        <p className={css.LoaderText}>...Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
