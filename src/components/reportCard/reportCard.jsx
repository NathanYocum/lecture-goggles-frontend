import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { colors } from '../__styles__/styles';
import GenericButton from '../button/button';

const ReportCardContainer = styled.div`
  border: 1px solid #aaaaaa;
  margin-bottom: 8px;
  color: ${props => (props.teacher_created ? colors.secondaryLightOrange : colors.primaryBlue)};
  background-color: ${props => (props.is_post ? '#ffffff' : colors.lightGrey)};
  display: flex;
  flex-direction: column;
`;

const ElementContainer = styled.div``;

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'https://' + process.env.REACT_APP_API_URI;

const ReportCard = ({ report }) => {
  const [dateToDisplay] = useState(() => {
    const date = new Date(report.created_at);
    return date.toDateString();
  });

  const [isResolved, setResolved] = useState(false);

  function resolveReport() {
    const token = localStorage.getItem('token');
    axios
      .post(`${urlToUse}/v1/report/resolveReport/${report.id}/`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setResolved(true));
  }

  if (isResolved) {
    return <></>;
  }

  return (
    <ReportCardContainer is_post={report.reported_post_id} teacher_created={report.teacher_created}>
      {/* {JSON.stringify(report)} */}
      {report.description && <ElementContainer>Description: {report.description}</ElementContainer>}
      {report.author_id && <ElementContainer>Author: {report.author_id}</ElementContainer>}
      {dateToDisplay && <ElementContainer>Created At: {dateToDisplay}</ElementContainer>}
      {report.reported_content_extension && (
        <a href={report.reported_content_extension}>
          <GenericButton height="56px">View error page: {report.reported_content_extension}</GenericButton>
        </a>
      )}
      {report.reported_post_id && (
        <a href={`resources?postId=${report.reported_post_id}`}>
          <GenericButton height="56px">View post {report.reported_post_id}</GenericButton>
        </a>
      )}
      <GenericButton onClickFunction={() => resolveReport()} style={{ marginTop: '4px' }}>
        MARK AS RESOLVED
      </GenericButton>
    </ReportCardContainer>
  );
};

ReportCard.propTypes = {
  report: PropTypes.shape({}).isRequired
};

export default ReportCard;
