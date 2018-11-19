import React from 'react';
import PropTypes from 'prop-types';

const PlaceholderItem = ({ width, height, viewBox, fillColor }) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} viewBox={viewBox}>
    <defs />
    <rect x="0" y="0" width={width} height={height} fill={fillColor} stroke="#0074d9" pointerEvents="none" />
  </svg>
);

PlaceholderItem.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
  fillColor: PropTypes.string
};

PlaceholderItem.defaultProps = {
  width: '1000',
  height: '200',
  viewBox: `0 0 ${PlaceholderItem.width} ${PlaceholderItem.height}`,
  fillColor: '#111111'
};

export default PlaceholderItem;
