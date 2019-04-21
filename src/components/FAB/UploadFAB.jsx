import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FloatingActionButton from './FAB';

const UploadFAB = () => (
  <a href="/upload">
    <FloatingActionButton>
      <FontAwesomeIcon icon="plus" color="#eeeeee" />
    </FloatingActionButton>
  </a>
);

export default UploadFAB;
