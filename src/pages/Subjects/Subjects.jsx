import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GridBody from '../../components/gridBody';
import SubjectItem from './subjectItem/subjectItem';
import UploadFAB from '../../components/FAB/UploadFAB';
import AuthContext from '../../contexts/AuthContext';

const SubjectsBody = styled(GridBody)`
  grid-row-gap: 8px;
`;

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const SubjectsPage = () => {
  const { signedInAs } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [subjectSubscriptions, setSubjectSubscriptions] = useState([]);
  useEffect(() => {
    axios.get(`${urlToUse}/v1/subject/getAll/`).then(({ data }) => {
      if (signedInAs !== '') {
        const token = localStorage.getItem('token');
        axios
          .get(`${urlToUse}/v1/users/getMySubjectSubscriptions`, { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            setSubjectSubscriptions(response.data);
          });
      }
      setSubjects(data.subjects[0]);
    });
  }, [signedInAs]);
  return (
    <SubjectsBody data-testid="subjects">
      <div style={{ gridColumn: 2 }} />
      {subjects.length === 0 ? (
        <div style={{ gridColumn: 2 }} />
      ) : (
        subjects.map(subject => {
          const isSubscribed =
            subjectSubscriptions.filter(subscription => subject.id === subscription.subject_id).length !== 0;
          return (
            <SubjectItem
              subjectName={subject.subject}
              key={subject.subject}
              subjectId={subject.id}
              description={subject.description}
              isSubscribed={isSubscribed}
            />
          );
        })
      )}
      <UploadFAB />
    </SubjectsBody>
  );
};

export default SubjectsPage;
