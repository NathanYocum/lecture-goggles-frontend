import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubjectItemContainer } from '../../__styles__/styles';

const SubjectItem = ({ row }) => {
  const [renderDescription, dispatch] = React.useReducer(state => {
    if (state === true) {
      return false;
    }
    return true;
  }, false);
  return (
    <SubjectItemContainer row={row}>
      <div style={{ flexGrow: 2 }}>Subject</div>
      <button type="button">+ Subscribe</button>
      <button type="button" onClick={() => dispatch(renderDescription)}>
        <FontAwesomeIcon icon="chevron-down" size="2x" />
      </button>
      {renderDescription && <p>Brief Description</p>}
    </SubjectItemContainer>
  );
};

SubjectItem.propTypes = {
  row: PropTypes.number
};

SubjectItem.defaultProps = {
  row: 2
};

export default SubjectItem;
