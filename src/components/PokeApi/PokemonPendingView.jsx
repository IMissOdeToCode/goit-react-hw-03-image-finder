import { ImSpinner } from 'react-icons/im';
import PokemonDataView from './PokemonDataView';
import pendingImage from './questionMark.jpeg';

const PokemonPendingView = ({ pokemonName }) => {
  const pokemon = {
    name: pokemonName,
    sprites: {
      other: {
        'official-artwork': {
          front_default: pendingImage,
        },
      },
    },
    stats: [],
  };

  return (
    <div role="alert">
      <div>
        <ImSpinner
          className="icon-spin"
          size="32"
        />
        Loading
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  );
};

export default PokemonPendingView;
