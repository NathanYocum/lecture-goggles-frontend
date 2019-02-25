import React from 'react';
import styled from 'styled-components';
import GridBody from '../gridBody';
import ResourceCard from '../resourceCard/ResourceCard';

const ResourcesBody = styled(GridBody)`
  grid-row-gap: 12px;
`;

const TempCardStyle = styled.div`
  grid-column: 2;
`;

const Resources = () => (
  <ResourcesBody data-testid="resources">
    <div style={{ gridColumn: 2 }} />
    <TempCardStyle>
      {/*
              This card is a temporary card we will use until the backend is
              linked up
      */}
      <ResourceCard
        title="TITLE"
        subject="SUBJECT"
        topic="TOPIC"
        author="AUTHOR"
        authorImg="Avatar.svg"
        previewImg="Image.svg"
        points={36}
        timeStamp="TIMESTAMP"
        description="DESCRIPTION"
        url="http://localhost:3000/"
      />
      <ResourceCard
        title="TITLE"
        subject="SUBJECT"
        topic="TOPIC"
        author="AUTHOR"
        authorImg="Avatar.svg"
        previewImg="Image.svg"
        points={36}
        timeStamp="TIMESTAMP"
        description="DESCRIPTION"
        url="http://localhost:3000/"
      />
      <ResourceCard
        title="TITLE"
        subject="SUBJECT"
        topic="TOPIC"
        author="AUTHOR"
        authorImg="Avatar.svg"
        previewImg="Image.svg"
        points={36}
        timeStamp="TIMESTAMP"
        description="DESCRIPTION"
        url="http://localhost:3000/"
      />
    </TempCardStyle>
  </ResourcesBody>
);

export default Resources;
