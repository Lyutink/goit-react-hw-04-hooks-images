import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { ModalBackdrop, ModalContent } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ children }) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // const toggleModal = () => {
  //   setShowModal((prevState) => ( !prevState.showModal ));
  // };

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      setShowModal(false);
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  if (showModal === true) {
    return createPortal(
      <ModalBackdrop onClick={handleBackdropClick}>
        <ModalContent>{children}</ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  } else {
    return <></>;
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
