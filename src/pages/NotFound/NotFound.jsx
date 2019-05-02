import React from 'react';
import styled from 'styled-components';
import GridBody from '../../components/gridBody';
import LectureGogglesLogo from '../../components/logo/logo';
import GenericButton from '../../components/button/button';
import { InputStyle, colors } from '../../components/__styles__/styles';

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

const ErrorCode = styled.p`
  grid-column: 2;
  grid-row: 5;
  font-weight: bold;
  justify-self: center;
  align-self: center;
  text-align: center;
  font-size: 20px;
  color: ${colors.secondaryOrange};
`;

const HomeButtonLink = styled.a`
  grid-column: 2;
  grid-row: 6;
  width: 100%;
  height: 56px;
  text-align: center;
`;

const NotFound = () => {
  let val;
  return (
    <GridBody data-testid="not-found">
      <LogoStyle>
        <LectureGogglesLogo width={200} height={200} />
      </LogoStyle>
      <NotFoundPar>We could not find the page you were looking for.</NotFoundPar>
      {/* Search Bar should be made into a component because we will reuse it a lot */}
      <InputStyle
        value={val}
        onChange={e => {
          val = e.target.value;
        }}
        style={{ gridColumn: 2, gridRow: 4 }}
        placeholder="Search"
      />
      <ErrorCode>Error: 404</ErrorCode>
      <HomeButtonLink href="/">
        <GenericButton width="80%" text="HOME" />
      </HomeButtonLink>
    </GridBody>
  );
};

export default NotFound;
