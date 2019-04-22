import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GridBody from '../../components/gridBody';
import ResourceCard from '../../components/resourceCard/ResourceCard';
import { SelectStyle } from '../../components/__styles__/styles';
import AuthContext from '../../contexts/AuthContext';
import UploadFAB from '../../components/FAB/UploadFAB';

const ResourcesBody = styled(GridBody)`
  grid-row-gap: 12px;
`;

const TempCardStyle = styled.div`
  grid-column: 2;
`;

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const Resources = () => {
  const { signedInAs } = useContext(AuthContext);

  const urlParams = new URLSearchParams(window.location.search);

  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [resources, setResources] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(urlParams.has('subjectId') ? urlParams.get('subjectId') : '');
  const [currentTopic, setCurrentTopic] = useState(urlParams.has('topicId') ? urlParams.get('topicId') : '');
  useEffect(() => {
    axios.get(`${urlToUse}/v1/subject/getAll/`).then(response => {
      if (response.data.subjects[0].length !== 0) {
        setSubjects(response.data.subjects[0].map(({ subject, id }) => ({ subject, id })));
      }
    });
    if (signedInAs !== '') {
      const token = localStorage.getItem('token');
      axios.get(`${urlToUse}/v1/post/getAll/`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
        setResources(
          // Join the vote_status and the post
          response.data.posts[0].map(post => {
            const postCopy = post;
            [postCopy.vote_status] = response.data.vote_status[0].filter(vote => post.id === vote.post_id);
            return postCopy;
          })
        );
      });
    } else {
      axios.get(`${urlToUse}/v1/post/getAll/`).then(response => {
        setResources(response.data.posts[0]);
      });
    }
  }, [signedInAs]);
  useEffect(() => {
    if (currentSubject !== '') {
      axios.get(`${urlToUse}/v1/topic/getTopics/${currentSubject}/`).then(response => {
        setTopics(response.data.topics[0]);
      });
    }
  }, [currentSubject]);
  useEffect(() => {
    if (currentTopic !== '') {
      axios.get(`${urlToUse}/v1/post/getTopic/${currentTopic}/`).then(response => {
        setResources(response.data.posts[0]);
      });
    }
  }, [currentTopic]);

  return (
    <ResourcesBody data-testid="resources">
      <div style={{ gridColumn: 2 }} />
      <div style={{ gridColumn: 2 }}>Subject</div>
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
        <>
          <div style={{ gridColumn: 2 }}>Topic</div>
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
        </>
      )}
      <TempCardStyle>
        {resources.length === 0 ? (
          <div>Sorry, no resources have been added to this topic</div>
        ) : (
          <div>
            {resources.map(post => (
              <ResourceCard
                key={`${post.resource_url}_${post.id}`}
                title={post.resource}
                subject={post.subject_name}
                topic={post.topic_name}
                author={post.author_name}
                authorImg="Avatar.svg"
                previewImg="Image.svg"
                points={post.upvote_count}
                description={post.description}
                timeStamp={post.created_at}
                url={post.resource_url}
                id={post.id}
                vote={post.vote_status}
              />
            ))}
          </div>
        )}
      </TempCardStyle>
      <UploadFAB />
    </ResourcesBody>
  );
};

export default Resources;
