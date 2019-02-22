import React from 'react';
import styled from 'styled-components';
import GridBody from '../gridBody';
import SubjectItem from './subjectItem/subjectItem';

const SubjectsBody = styled(GridBody)`
  grid-row-gap: 5px;
`;

const SubjectsPage = () => (
  <SubjectsBody data-testid="subjects">
    <SubjectItem />
    <SubjectItem row={3} />
  </SubjectsBody>
);

export default SubjectsPage;
