import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DropDownStyle = styled.div`
  background-color: #ffffff;
  border: 1px solid #efefef;
  width: 156px;
  min-height: 56px;
  max-height: 300px;
  z-index: 4;
  position: absolute;
  left: ${props => props.pos.x}px;
  top: ${props => props.pos.y}px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const ResourceCardDropDown = props => {
  const { children } = props;
  return <DropDownStyle>{children}</DropDownStyle>;
};

ResourceCardDropDown.propTypes = {
  children: PropTypes.node
};

ResourceCardDropDown.defaultProps = {
  children: <></>
};

export default ResourceCardDropDown;
