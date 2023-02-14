import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

const ImageGalleryItem = ({ image, showLargeImage }) => {
  return (
    <li
      onClick={() => {
        showLargeImage(image.largeImageURL);
      }}
      className={css.ImageGalleryItem}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={image.webformatURL}
        alt={image.id}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    id: PropTypes.number,
  }),
  showLargeImage: PropTypes.func.isRequired,
};
