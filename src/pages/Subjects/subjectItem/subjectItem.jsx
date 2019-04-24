import React, { useReducer, useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  SubjectItemContainer,
  SubjectDescriptionContainer,
  UnstyledButton,
  SubscribeButton
} from '../../../components/__styles__/styles';
import useWindowWidth from '../../../hooks/useWindowWidth';
import GenericButton from '../../../components/button/button';
import AuthContext from '../../../contexts/AuthContext';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const SubjectItem = props => {
  const { signedInAs } = useContext(AuthContext);
  const { subjectName, description, subjectId, isSubscribed } = props;
  const width = useWindowWidth();
  const [renderDescription, dispatch] = useReducer(state => {
    if (state === true) {
      return false;
    }
    return true;
  }, false);
  const [isSubscribedState, setSubscribedState] = useState(isSubscribed);

  useEffect(() => {
    setSubscribedState(isSubscribed);
  }, [isSubscribed]);

  function subscribeToSubject() {
    const token = localStorage.getItem('token');
    axios.post(
      `${urlToUse}/v1/users/subscribeToSubject/${subjectId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubscribedState(!isSubscribedState);
  }

  return (
    <SubjectItemContainer width={width}>
      <div style={{ color: '#ffffff', paddingLeft: '8px' }}>{subjectName}</div>
      {signedInAs !== '' && (
        <SubscribeButton isSubscribed={isSubscribedState} onClick={subscribeToSubject} type="button">
          {isSubscribedState ? 'Subscribed' : '+Subscribe'}
        </SubscribeButton>
      )}
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
  subjectId: PropTypes.number.isRequired,
  isSubscribed: PropTypes.bool.isRequired
};

export default SubjectItem;
