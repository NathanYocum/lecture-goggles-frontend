import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FloatingActionButton from './FAB';
import AuthContext from '../../contexts/AuthContext';

const UploadFAB = () => {
  const { signedInAs } = useContext(AuthContext);
  if (signedInAs === '') {
    return <></>;
  }
  return (
    <a href="/upload">
      <FloatingActionButton>
        <FontAwesomeIcon icon="plus" color="#eeeeee" />
      </FloatingActionButton>
    </a>
  );
};
export default UploadFAB;
