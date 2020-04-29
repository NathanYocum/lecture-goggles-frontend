import React, { FunctionComponent } from 'react';
import ReactModal from 'react-modal';

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

export interface ModalProps {
  isOpen: boolean;
}

const Modal: FunctionComponent<ModalProps> = props => {
  const { children } = props;
  return (
    <ReactModal style={{ overlay: { zIndex: 1000 } }} {...props}>
      {children}
    </ReactModal>
  );
};

export default Modal;
