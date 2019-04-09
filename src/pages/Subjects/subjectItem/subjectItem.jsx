import React, { useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  SubjectItemContainer,
  SubjectDescriptionContainer,
  UnstyledButton,
  SubscribeButton
} from '../../../components/__styles__/styles';
import useWindowWidth from '../../../hooks/useWindowWidth';
import GenericButton from '../../../components/button/button';

const SubjectItem = props => {
  const { subjectName, description, subjectId } = props;
  const width = useWindowWidth();
  const [renderDescription, dispatch] = useReducer(state => {
    if (state === true) {
      return false;
    }
    return true;
  }, false);
  return (
    <SubjectItemContainer width={width}>
      <div style={{ color: '#ffffff', paddingLeft: '8px' }}>{subjectName}</div>
      <SubscribeButton type="button">{width > 475 ? '+Subscribe' : '+'}</SubscribeButton>
      <UnstyledButton type="button" onClick={() => dispatch(renderDescription)}>
        <FontAwesomeIcon icon={renderDescription ? 'chevron-up' : 'chevron-down'} color="#ffffff" />
      </UnstyledButton>
      {renderDescription && (
        <SubjectDescriptionContainer>
          {description === '' ? 'no description provided' : description}
          <a href={`/topics?subjectId=${subjectId}`}>
            <GenericButton borderColor="#e65100" backgroundColor="#ff9800" text="View Topics" />
          </a>
        </SubjectDescriptionContainer>
      )}
    </SubjectItemContainer>
  );
};

SubjectItem.propTypes = {
  subjectName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subjectId: PropTypes.number.isRequired
};

export default SubjectItem;
