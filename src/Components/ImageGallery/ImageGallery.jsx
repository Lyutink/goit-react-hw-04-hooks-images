import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

import { ImageGalleryContainer } from "./ImageGallery.styled";

export default function ImageGallery({ images }) {
  return (
    <ImageGalleryContainer>
      {images.map(({ id, previewURL, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          previewURL={previewURL}
          img={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </ImageGalleryContainer>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
