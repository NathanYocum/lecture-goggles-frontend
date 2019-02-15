import React from 'react';
import styled from 'styled-components';
import GridBody from '../gridBody';
import LectureGogglesLogo from '../logo/logo';
import GenericButton from '../button/button';

const LogoStyle = styled.div`
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
  align-self: center;
  text-align: center;
`;

const NotFoundPar = styled.p`
  grid-column: 2;
  grid-row: 3;
  justify-self: center;
  align-self: center;
  text-align: center;
  font-size: 20px;
  color: #0d47a1;
`;

const SearchStyle = styled.div`
  grid-column: 2;
  grid-row: 4;
  border: 2px solid #0d47a1;
  width: 100%;
  height: 56px;
  border-radius: 20px;
  font-size: 16px;
  color: #90a4ae;
  display: flex;
  align-items: center;
  padding-left: 16px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
`;

const ErrorCode = styled.p`
  grid-column: 2;
  grid-row: 5;
  font-weight: bold;
  justify-self: center;
  align-self: center;
  text-align: center;
  font-size: 20px;
  color: #ff9800;
`;

const HomeButtonLink = styled.a`
  grid-column: 2;
  grid-row: 6;
  width: 100%;
  height: 56px;
`;

const NotFound = () => (
  <GridBody data-testid="not-found">
    <LogoStyle>
      <LectureGogglesLogo width={200} height={200} />
    </LogoStyle>
    <NotFoundPar>We could not find the page you were looking for.</NotFoundPar>
    {/* Search Bar should be made into a component because we will reuse it a lot */}
    <SearchStyle>Search</SearchStyle>
    <ErrorCode>Error: 404</ErrorCode>
    <HomeButtonLink href="/">
      <GenericButton text="HOME" />
    </HomeButtonLink>
  </GridBody>
);

export default NotFound;
