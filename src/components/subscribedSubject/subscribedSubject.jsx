import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import { colors } from '../__styles__/styles';
import GenericButton from '../button/button';

const Container = styled.div`
  background-color: ${colors.primaryBlue};
  color: #efefef;
  min-height: 56px;
  margin: 8px;
  box-shadow: '2px 4px 10px 0px rgba(0, 0, 0, 0.2)';
  display: flex;
  align-items: center;
  text-align: left;
  padding: 4px;
`;

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'https://api.lecturegoggles.io';

const SubscribedSubject = props => {
  const { subject } = props;
  const [subjectState, setSubject] = useState(null);
  useEffect(() => {
    axios
      .get(`${urlToUse}/v1/subject/getById/${subject.subject_id}/`)
      .then(response => setSubject(response.data.subject[0]));
  }, [subject]);
  if (subjectState === null) {
    return <></>;
  }
  return (
    <Container>
      <div style={{ marginLeft: '10px', flexGrow: 2 }}>{subjectState.subject}</div>
      <a href={`/topics?subjectId=${subjectState.id}`}>
        <GenericButton borderColor={colors.secondaryDarkOrange} backgroundColor={colors.secondaryOrange}>
          <FontAwesomeIcon color="#efefef" icon="scroll" />
          <div>View Topics</div>
        </GenericButton>
      </a>
    </Container>
  );
};

SubscribedSubject.propTypes = {
  subject: PropTypes.shape({}).isRequired
};

export default SubscribedSubject;
