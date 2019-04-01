import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GridBody from '../gridBody';
import SubjectItem from './subjectItem/subjectItem';

const SubjectsBody = styled(GridBody)`
  grid-row-gap: 8px;
`;

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    axios.get(`${urlToUse}/subject`).then(({ data }) => {
      setSubjects(data.subjects[0]);
    });
  }, []);
  return (
    <SubjectsBody data-testid="subjects">
      <div style={{ gridColumn: 2 }} />
      {subjects.length === 0 ? (
        <div style={{ gridColumn: 2 }} />
      ) : (
        subjects.map(subject => (
          <SubjectItem subjectName={subject.subject} key={subject.subject} description={subject.description} />
        ))
      )}
    </SubjectsBody>
  );
};

export default SubjectsPage;
