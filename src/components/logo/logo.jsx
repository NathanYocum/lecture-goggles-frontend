import React from 'react';
import PropTypes from 'prop-types';

const LectureGogglesLogo = ({ width, height }) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} viewBox="-0.5 -0.5 280 280">
    <defs />
    <ellipse cx="140" cy="140" rx="139.5" ry="139.5" fill="#ccffff" stroke="#0074d9" pointerEvents="none" />
    <ellipse cx="83" cy="131" rx="75" ry="75" fill="#0074d9" stroke="#7fdbff" pointerEvents="none" />
    <ellipse cx="98" cy="131" rx="75" ry="75" fill="#7fdbff" stroke="#7fdbff" pointerEvents="none" />
    <ellipse cx="198" cy="131" rx="75" ry="75" fill="#7fdbff" stroke="#7fdbff" pointerEvents="none" />
  </svg>
);

LectureGogglesLogo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

LectureGogglesLogo.defaultProps = {
  width: 50,
  height: 50
};

export default LectureGogglesLogo;
