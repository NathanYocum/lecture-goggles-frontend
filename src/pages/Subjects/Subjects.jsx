import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GridBody from '../../components/gridBody';
import SubjectItem from './subjectItem/subjectItem';
import UploadFAB from '../../components/FAB/UploadFAB';

const SubjectsBody = styled(GridBody)`
  grid-row-gap: 8px;
`;

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    axios.get(`${urlToUse}/v1/subject/getAll/`).then(({ data }) => {
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
          <SubjectItem
            subjectName={subject.subject}
            key={subject.subject}
            subjectId={subject.id}
            description={subject.description}
          />
        ))
      )}
      <UploadFAB />
    </SubjectsBody>
  );
};

export default SubjectsPage;
