import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../__styles__/styles';

const style1 = {
  fill: 'none',
  stroke: '#001f3f',
  strokeMiterlimit: '10',
  strokeWidth: '4px'
};

const style2 = {
  fill: colors.primaryBlue,
  stroke: '#001f3f',
  strokeMiterlimit: '10',
  strokeWidth: '5px'
};

const style3 = {
  fill: '#d0ccd0',
  stroke: '#001f3f',
  strokeMiterlimit: '10',
  strokeWidth: '8px'
};

const fontStyle = {
  fontSize: '48px',
  fill: '#001f3f',
  fontFamily: 'IBMPlexSans-SemiBold, IBM Plex Sans SemiBold, sans-serif',
  fontWeight: '600'
};

const FullLectureGogglesLogo = ({ width, height }) => (
  <a href="/">
    <svg
      width={`${width}`}
      height={`${height}`}
      id="goggles"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 449.5 150"
    >
      <title>Lecture Goggles Home</title>
      <path
        d="M159.85,102.66c-14.7-1.83-19.84,36.8-48.35,51.84-20.84,11-52.3,6.89-65-10.15-13.21-17.75-3.08-47.13,1-55.85,3.21-6.87,13.6-23.54,31-33,11.14-6.06,20.41-4.53,38.84-5.79A676.73,676.73,0,0,0,186,41.52c42.55-7.54,53.7-17.9,66.78-9.44C266,40.65,267.5,59.62,268.2,68.38c1.72,21.89-6.25,56.23-32.86,66.31-20.52,7.78-44.54-1.77-57.73-13.58C166.9,111.51,166.81,103.52,159.85,102.66Z"
        transform="translate(-29.5 -21)"
        style={style2}
      />
      <path
        d="M174.73,104.6c-14.71-1.83-19.13,33.2-47.64,48.24-20.85,11-53,10.49-65.71-6.55-13.21-17.75.07-46.21,4.14-54.93C68.73,84.49,76.58,68.23,94,58.77c11.13-6.06,19.8-5.86,38.24-7.12a676.41,676.41,0,0,0,68.63-8.19c42.56-7.54,53.7-17.9,66.78-9.44,13.25,8.57,14.75,27.54,15.44,36.3,1.73,21.89-6.25,56.23-32.85,66.31-20.53,7.78-44.55-1.77-57.73-13.58C181.78,113.45,181.69,105.46,174.73,104.6Z"
        transform="translate(-29.5 -21)"
        style={style3}
      />
      <path d="M337.5,185.5" transform="translate(-29.5 -21)" style={style1} />
      <path d="M361,184" transform="translate(-29.5 -21)" />
      <text transform="translate(261.74 48.94)" style={fontStyle}>
        Lecture
      </text>
      <text transform="translate(261.74 97)" style={fontStyle}>
        Goggles
      </text>
    </svg>
  </a>
);

FullLectureGogglesLogo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

FullLectureGogglesLogo.defaultProps = {
  width: 100,
  height: 50
};

export default FullLectureGogglesLogo;
