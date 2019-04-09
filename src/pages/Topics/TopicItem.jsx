import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from '../../components/button/button';

const TopicItem = props => {
  const { topicName, description, subjectId, topicId } = props;
  return (
    <div style={{ gridColumn: 2, border: '1px solid black', marginBottom: '31px', marginTop: '1px', padding: '16px' }}>
      <h1>{topicName}</h1>
      <p>{description === '' ? 'No description provided' : description}</p>
      <a href={`/resources?subjectId=${subjectId}&topicId=${topicId}`}>
        <GenericButton text="View Resources" />
      </a>
    </div>
  );
};

TopicItem.propTypes = {
  topicName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  topicId: PropTypes.number.isRequired
};

export default TopicItem;
