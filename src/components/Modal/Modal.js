import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <p>{props.title}</p>
        <button onClick={props.closeModal} className="close">close</button>
        {props.children}
      </div>
    </div>
  )
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};

Modal.defaultProps = {
  showModal: false,
  title: ''
};

export default Modal;
