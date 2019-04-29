import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExtendedFloatingActionButton from './ExtendedFAB';
import Modal from '../modal/Modal';
import { UnstyledButton } from '../__styles__/styles';

const ErrorFAB = () => {
  const [isShowingErrorReportModal, setShowingErrorReportModal] = useState(false);
  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setShowingErrorReportModal(false);
      }
    });
  }, []);
  return (
    <>
      <ExtendedFloatingActionButton onClick={() => setShowingErrorReportModal(true)} backgroundColor="#ffffff">
        <FontAwesomeIcon icon="exclamation-triangle" color="#ff4000" />
        <span style={{ color: '#ff4000', marginLeft: '12px', fontWeight: 600 }}>Report an error</span>
      </ExtendedFloatingActionButton>
      <Modal contentLabel="Error Modal" isOpen={isShowingErrorReportModal}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'auto 36px' }}>
          <UnstyledButton style={{ gridRow: 1, gridColumn: 2 }} onClick={() => setShowingErrorReportModal(false)}>
            <FontAwesomeIcon icon="times" />
          </UnstyledButton>
          <h1 style={{ gridColumn: 1, gridRow: 1 }}>Report an error</h1>
        </div>
      </Modal>
    </>
  );
};

export default ErrorFAB;
