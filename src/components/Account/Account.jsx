import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import GridBody from '../gridBody';
import AuthContext from '../../contexts/AuthContext';

const AccountPage = () => {
  const { signedInAs } = useContext(AuthContext);
  return (
    <GridBody data-testid="account">
      {signedInAs === '' && <Redirect to="/signIn" from="/account" />}
      <div style={{ gridColumn: 2, gridRow: 2 }}>User: {signedInAs}</div>
    </GridBody>
  );
};

export default AccountPage;
