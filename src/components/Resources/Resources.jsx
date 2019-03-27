import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GridBody from '../gridBody';
import ResourceCard from '../resourceCard/ResourceCard';
import { SelectStyle } from '../__styles__/styles';

const ResourcesBody = styled(GridBody)`
  grid-row-gap: 12px;
`;

const TempCardStyle = styled.div`
  grid-column: 2;
`;

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const Resources = () => {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [resources, setResources] = useState([]);
  const [currentSubject, setCurrentSubject] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  useEffect(() => {
    axios.get(`${urlToUse}/subject`).then(response => {
      if (response.data.subjects[0].length !== 0) {
        setSubjects(response.data.subjects[0].map(({ subject, id }) => ({ subject, id })));
      }
    });
    axios.get(`${urlToUse}/all/post`).then(response => {
      setResources(response.data.posts[0]);
    });
  }, []);
  useEffect(() => {
    if (currentSubject !== '') {
      axios.get(`${urlToUse}/${currentSubject}/topic`).then(response => {
        setTopics(response.data.topics[0]);
      });
    }
  }, [currentSubject]);
  useEffect(() => {
    if (currentTopic !== '') {
      axios.get(`${urlToUse}/topic/${currentTopic}/post`).then(response => {
        setResources(response.data.posts[0]);
      });
    }
  }, [currentTopic]);
  return (
    <ResourcesBody data-testid="resources">
      <div style={{ gridColumn: 2 }} />
      <SelectStyle
        value={currentSubject}
        onChange={event => setCurrentSubject(event.target.value)}
        style={{ gridColumn: 2 }}
      >
        <option value="">Choose a subject</option>
        {subjects.length !== 0 &&
          subjects.map(subject => (
            <option value={subject.id} key={subject.id}>
              {subject.subject}
            </option>
          ))}
      </SelectStyle>
      {currentSubject !== '' && (
        <SelectStyle
          value={currentTopic}
          onChange={event => setCurrentTopic(event.target.value)}
          style={{ gridColumn: 2 }}
        >
          <option value="">Choose a topic</option>
          {topics.length !== 0 &&
            topics.map(topic => (
              <option value={topic.id} key={topic.id}>
                {topic.topic}
              </option>
            ))}
        </SelectStyle>
      )}
      <TempCardStyle>
        {resources.length === 0 ? (
          <div>Sorry, no resources have been added to this topic</div>
        ) : (
          <div>
            {resources.map(post => (
              <ResourceCard
                key={post.resource_url}
                title={post.resource}
                subject={currentSubject}
                topic={currentTopic}
                author="author"
                authorImg="Avatar.svg"
                previewImg="Image.svg"
                points={36}
                description={post.description}
                timeStamp={post.created_at}
                url={post.resource_url}
              />
            ))}
          </div>
        )}
      </TempCardStyle>
    </ResourcesBody>
  );
};

export default Resources;
