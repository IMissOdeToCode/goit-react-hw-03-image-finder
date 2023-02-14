import PropTypes from 'prop-types';

const DetailedImage = ({ largeImageURL }) => {
  return (
    <img
      src={largeImageURL}
      alt=""
    />
  );
};

export default DetailedImage;

DetailedImage.propTypes = { largeImageURL: PropTypes.string };
