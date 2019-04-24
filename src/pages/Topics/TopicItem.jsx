import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GenericButton from '../../components/button/button';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const TopicItem = props => {
  const { topicName, description, subjectId, topicId, isSubscribed } = props;
  const [isSubscribedState, setSubscribedState] = useState(isSubscribed);
  useEffect(() => setSubscribedState(isSubscribed), [isSubscribed]);
  function subscribeToTopic() {
    const token = localStorage.getItem('token');
    axios.post(
      `${urlToUse}/v1/users/subscribeToTopic/${topicId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubscribedState(!isSubscribedState);
  }
  return (
    <div
      style={{
        gridColumn: 2,
        border: '1px solid #e3e3e3',
        marginBottom: '31px',
        marginTop: '3px',
        padding: '16px',
        boxShadow: '4px 8px 10px 0px rgba(0, 0, 0, 0.2)'
      }}
    >
      <h1>{topicName}</h1>
      <p>{description === '' ? 'No description provided' : description}</p>
      <a href={`/resources?subjectId=${subjectId}&topicId=${topicId}`}>
        <GenericButton text="View Resources" />
      </a>
      <GenericButton
        backgroundColor={isSubscribedState ? '#3D9970' : '#ff9800'}
        borderColor={isSubscribedState ? '#3D9970' : '#e65100'}
        onClickFunction={subscribeToTopic}
        height="56px"
        text={isSubscribedState ? 'Subscribed' : '+Subscribe'}
      />
    </div>
  );
};

TopicItem.propTypes = {
  topicName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  topicId: PropTypes.number.isRequired,
  isSubscribed: PropTypes.bool
};

TopicItem.defaultProps = {
  isSubscribed: undefined
};

export default TopicItem;
