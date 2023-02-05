import css from './styles.module.css';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className={css.ImageGalleryItemImage}>
      <img
        src={image.webformatURL}
        alt={image.id}
      />
    </li>
  );
};

export default ImageGalleryItem;
