import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GridBody from '../../components/gridBody';
import { SelectStyle } from '../../components/__styles__/styles';
import UploadFAB from '../../components/FAB/UploadFAB';
import TopicItem from './TopicItem';
import AuthContext from '../../contexts/AuthContext';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'https://api.lecturegoggles.io';

const urlParams = new URLSearchParams(window.location.search);

const TopicsPage = () => {
  const { signedInAs } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentSubject, setCurrentSubject] = useState(urlParams.has('subjectId') ? urlParams.get('subjectId') : '');

  useEffect(() => {
    axios.get(`${urlToUse}/v1/subject/getAll/`).then(response => {
      if (response.data.subjects[0].length !== 0) {
        setSubjects(response.data.subjects[0].map(({ subject, id }) => ({ subject, id })));
      }
    });
  }, []);

  useEffect(() => {
    if (currentSubject !== '') {
      setLoading(true);
      axios
        .get(`${urlToUse}/v1/topic/getTopics/${currentSubject}/`)
        .then(({ data }) => {
          const dataCopy = data;
          if (signedInAs !== '') {
            dataCopy.topics[0].map(topic => {
              const topicCopy = topic;
              const token = localStorage.getItem('token');
              axios
                .get(`${urlToUse}/v1/users/getMyTopicSubscription/${topic.id}/`, {
                  headers: { Authorization: `Bearer ${token}` }
                })
                .then(response => {
                  topicCopy.isSubscribed = Object.keys(response.data).length !== 0;
                })
                .then(() => setTopics(dataCopy.topics[0]));
              return topicCopy;
            });
          } else {
            dataCopy.topics[0].map(topic => {
              const topicCopy = topic;
              topicCopy.isSubscribed = false;
              return topicCopy;
            });
            setTopics(dataCopy.topics[0]);
          }
        })
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
    return setTopics([]);
  }, [currentSubject, signedInAs]);
  return (
    <GridBody data-testid="topics">
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
      {!loading && topics.length === 0 && currentSubject !== '' && (
        <div style={{ gridColumn: 2, paddingTop: '56px', color: '#ff4500' }}>
          There are no topics for the current subject.{' '}
          <a style={{ color: '#711' }} href="/upload">
            Upload
          </a>{' '}
          a topic for the subject.
        </div>
      )}
      <div style={{ gridColumn: 2 }}>
        {topics.map(topic => (
          <TopicItem
            key={topic.id}
            topicName={topic.topic}
            description={topic.description}
            subjectId={currentSubject}
            topicId={topic.id}
            isSubscribed={topic.isSubscribed}
          />
        ))}
      </div>
      <UploadFAB />
    </GridBody>
  );
};

export default TopicsPage;
