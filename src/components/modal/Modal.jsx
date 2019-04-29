import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

const Modal = props => {
  const { children } = props;
  return (
    <ReactModal style={{ overlay: { zIndex: 1000 } }} {...props}>
      {children}
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node
};

Modal.defaultProps = {
  children: <></>
};

export default Modal;
