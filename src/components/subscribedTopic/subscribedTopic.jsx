import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colors } from '../__styles__/styles';
import GenericButton from '../button/button';

const Container = styled.div`
  background-color: ${colors.primaryBlue};
  color: #efefef;
  min-height: 56px;
  margin: 8px;
  box-shadow: '2px 4px 10px 0px rgba(0, 0, 0, 0.2)';
  display: flex;
  align-items: center;
  text-align: left;
  padding: 4px;
  flex-wrap: wrap;
`;

const SubscribedTopic = ({ topic }) => {
  const [topicState, setTopic] = useState(null);
  useEffect(() => {
    axios.get(`/v1/topic/getById/${topic.topic_id}/`).then(response => setTopic(response.data));
  }, [topic]);
  if (topicState === null) {
    return <></>;
  }
  return (
    <Container>
      <div style={{ marginLeft: '10px', flexGrow: 2 }}>
        Topic: {topicState.topic.topic}
        <br />
        Subject: {topicState.subject.subject}
      </div>
      <div style={{ marginLeft: '10px' }} />
      <a href={`/resources?subjectId=${topicState.subject.id}&topicId=${topicState.topic.id}`}>
        <GenericButton borderColor={colors.secondaryDarkOrange} backgroundColor={colors.secondaryOrange}>
          <FontAwesomeIcon color="#efefef" icon="link" />
          <div>View Resources</div>
        </GenericButton>
      </a>
    </Container>
  );
};

SubscribedTopic.propTypes = {
  topic: PropTypes.shape({}).isRequired
};

export default SubscribedTopic;
