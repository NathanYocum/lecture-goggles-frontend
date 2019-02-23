import React, { useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  SubjectItemContainer,
  SubjectDescriptionContainer,
  UnstyledButton,
  SubscribeButton
} from '../../__styles__/styles';
import useWindowWidth from '../../__hooks__/useWindowWidth';

const SubjectItem = () => {
  const width = useWindowWidth();
  const [renderDescription, dispatch] = useReducer(state => {
    if (state === true) {
      return false;
    }
    return true;
  }, false);
  return (
    <SubjectItemContainer width={width}>
      <div style={{ color: '#ffffff', paddingLeft: '8px' }}>Subject</div>
      <SubscribeButton type="button">{width > 475 ? '+Subscribe' : '+'}</SubscribeButton>
      <UnstyledButton type="button" onClick={() => dispatch(renderDescription)}>
        <FontAwesomeIcon icon={renderDescription ? 'chevron-up' : 'chevron-down'} color="#ffffff" />
      </UnstyledButton>
      {renderDescription && <SubjectDescriptionContainer>Brief Description</SubjectDescriptionContainer>}
    </SubjectItemContainer>
  );
};

export default SubjectItem;
