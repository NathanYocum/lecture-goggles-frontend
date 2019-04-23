import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

const ReportModal = props => {
  const { children } = props;
  return (
    <ReactModal style={{ overlay: { zIndex: 1000 } }} {...props}>
      {children}
    </ReactModal>
  );
};

ReportModal.propTypes = {
  children: PropTypes.node
};

ReportModal.defaultProps = {
  children: <></>
};

export default ReportModal;
