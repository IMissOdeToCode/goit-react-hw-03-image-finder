import PropTypes from 'prop-types';

import css from './styles.module.css';

const ImageGalleryItem = ({ image, showPost }) => {
  return (
    <li
      onClick={() => {
        showPost(image.largeImageURL);
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
  showPost: PropTypes.func.isRequired,
};
