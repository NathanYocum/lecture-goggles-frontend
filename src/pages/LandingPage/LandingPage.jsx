import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UploadFAB from '../../components/FAB/UploadFAB';
import LectureGogglesLogo from '../../components/logo/logo';
import GenericButton from '../../components/button/button';
import GridBody from '../../components/gridBody';
import AuthContext from '../../contexts/AuthContext';

const LogoStyle = styled.div`
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
  align-self: center;
  text-align: center;
`;

const WelcomeStyle = styled.div`
  grid-row: 3;
  grid-column: 2;
  color: #0d47a1;
  text-align: center;
`;

const SignInButtonStyle = styled.div`
  grid-row: 4;
  grid-column: 2;
  font-size: 20px;
  @media (max-width: 700px) {
    width: 80%;
  }
  @media (min-width: 700px) {
    width: 373px;
  }

  margin-bottom: 16px;
  height: 56px;
`;

const AccountCreateButtonStyle = styled(SignInButtonStyle)`
  grid-row: 5;
`;

const LandingPage = () => {
  const { signedInAs, userData } = useContext(AuthContext);
  const [isAdmin, setAdmin] = useState(undefined);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (userData.is_staff) {
      axios
        .get('/v1/report/getReports', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setReports(response.data.reports[0]));
    }
    setAdmin(userData.is_staff);
  }, [userData]);
  return (
    <GridBody data-testid="landing-page">
      <div style={{ gridColumn: 1, gridRow: 1 }} />
      <LogoStyle>
        <LectureGogglesLogo width={200} height={200} />
      </LogoStyle>
      <WelcomeStyle>
        <h1>Welcome{signedInAs !== '' && ` ${signedInAs}`}!</h1>
        {signedInAs === '' && (
          <p>
            Lecture Goggles is a free, open-source, educational resource repository to help students gain a better
            understanding of school subjects.
          </p>
        )}
      </WelcomeStyle>
      {signedInAs === '' ? (
        <>
          <SignInButtonStyle>
            <a data-testid="sign-in-button" href="/signIn">
              <GenericButton text="SIGN IN" />
            </a>
          </SignInButtonStyle>
          <AccountCreateButtonStyle>
            <a href="/newAccount">
              <GenericButton text="CREATE AN ACCOUNT" />
            </a>
          </AccountCreateButtonStyle>
        </>
      ) : (
        <UploadFAB />
      )}
      {isAdmin && (
        <div
          style={{
            gridColumn: 2,
            width: '100%',
            backgroundColor: '#efefef',
            textAlign: 'center',
            minHeight: '56px'
          }}
        >
          ADMIN AREA
          {reports.map(report => (
            <div key={report.id}>{JSON.stringify(report)}</div>
          ))}
        </div>
      )}
    </GridBody>
  );
};

export default LandingPage;
