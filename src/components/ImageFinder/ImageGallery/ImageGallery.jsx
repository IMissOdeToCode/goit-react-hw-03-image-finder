import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

import css from './ImageGallery.module.css';

const ImageGallery = ({ images, showLargeImage }) => {
  const items = images.map(image => {
    return (
      <ImageGalleryItem
        showLargeImage={showLargeImage}
        key={image.id}
        image={image}
      />
    );
  });
  return (
    <div className={css.galleryContainer}>
      <ul className={css.ImageGallery}>{items}</ul>
    </div>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    id: PropTypes.number,
  }),
  showLargeImage: PropTypes.func.isRequired,
};
