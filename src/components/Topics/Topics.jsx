import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GridBody from '../gridBody';
import { SelectStyle } from '../__styles__/styles';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const TopicsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);

  const [currentSubject, setCurrentSubject] = useState(urlParams.has('subjectId') ? urlParams.get('subjectId') : '');

  useEffect(() => {
    axios.get(`${urlToUse}/subject`).then(response => {
      if (response.data.subjects[0].length !== 0) {
        setSubjects(response.data.subjects[0].map(({ subject, id }) => ({ subject, id })));
      }
    });
  }, []);

  useEffect(() => {
    if (currentSubject !== '') {
      axios.get(`${urlToUse}/${currentSubject}/topic`).then(({ data }) => {
        setTopics(data.topics[0]);
      });
    }
    return setTopics([]);
  }, [currentSubject]);
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
      <div style={{ gridColumn: 2 }}>
        {topics.map(topic => (
          <div key={topic.id}>{topic.topic}</div>
        ))}
      </div>
    </GridBody>
  );
};

export default TopicsPage;
