import { ImSpinner } from 'react-icons/im';

const Loader = () => {
  return (
    <div role="alert">
      <div>
        <ImSpinner
          className="icon-spin"
          size="32"
        />
        ...Loading
      </div>
    </div>
  );
};

export default Loader;
