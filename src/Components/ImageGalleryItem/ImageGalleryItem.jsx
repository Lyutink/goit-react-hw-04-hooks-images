import PropTypes from "prop-types";
import { render } from "@testing-library/react";

import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from "./ImageGalleryItem.styled";
import Modal from "../Modal/Modal";

export default function ImageGalleryItem({ img, largeImageURL }) {
  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImage
        src={img}
        onClick={() => {
          render(
            <Modal>
              <img src={largeImageURL} alt="img" />
            </Modal>
          );
        }}
      />
    </ImageGalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
