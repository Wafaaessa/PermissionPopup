import React from 'react';

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

Modal.setAppElement = () => {};

export default Modal;
