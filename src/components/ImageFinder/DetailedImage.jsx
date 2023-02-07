import css from './styles.module.css';

const DetailedImage = ({ largeImageURL }) => {
  return (
    <img
      src={largeImageURL}
      alt=""
    />
  );
};

export default DetailedImage;
