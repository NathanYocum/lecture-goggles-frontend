import React from 'react';
import styled from 'styled-components';
import GridBody from '../gridBody';
import SubjectItem from './subjectItem/subjectItem';

const SubjectsBody = styled(GridBody)`
  grid-row-gap: 8px;
`;

const SubjectsPage = () => (
  <SubjectsBody data-testid="subjects">
    <div style={{ gridColumn: 2 }} />
    <SubjectItem />
    <SubjectItem />
    <SubjectItem />
    <SubjectItem />
    <SubjectItem />
    <SubjectItem />
  </SubjectsBody>
);

export default SubjectsPage;
