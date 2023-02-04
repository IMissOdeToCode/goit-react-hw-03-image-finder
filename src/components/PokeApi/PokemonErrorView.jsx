import errorImage from '../PokeApi/sadCat.png';

const PokemonErrorView = ({ message }) => {
  return (
    <div role="alert">
      <img
        src={errorImage}
        width="240"
        alt="error"
      />
      <p>{message}</p>
    </div>
  );
};

export default PokemonErrorView;
