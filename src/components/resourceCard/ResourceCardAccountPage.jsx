import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  CardContainerStyle,
  TitleStyle,
  ItemStyle,
  DescriptionStyle,
  AvatarStyle,
  PreviewStyle,
  PreviewA,
  PreviewLink,
  LinkStyle,
  BottomContainer
} from '../__styles__/styles';
import GenericButton from '../button/button';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'https://api.lecturegoggles.io';

const ResourceCardAccountPage = ({
  title,
  subject,
  topic,
  author,
  authorImg,
  previewImg,
  points,
  timeStamp,
  description,
  url,
  id
}) => {
  const [isDeleted, setDeleted] = useState(false);
  function DeletePost() {
    const token = localStorage.getItem('token');
    axios
      .post(`${urlToUse}/v1/post/deletePost/${id}/`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setDeleted(true));
  }
  if (isDeleted) {
    return <></>;
  }
  return (
    <CardContainerStyle>
      <TitleStyle>{title}</TitleStyle>
      <div>
        <ItemStyle>{subject}</ItemStyle>
        <ItemStyle>{topic}</ItemStyle>
        <div style={{ height: '5px' }} />
      </div>
      <AvatarStyle width="40px" height="40px" src={authorImg} alt="uploader avatar" />
      <PreviewA href={url}>
        <PreviewStyle width="100%" height="195px" src={previewImg} alt="preview" />
      </PreviewA>
      <PreviewLink href={url}>
        <LinkStyle>{url.length < 37 ? url : `${url.substring(0, 34)}...`}</LinkStyle>
      </PreviewLink>
      <ItemStyle>Uploaded by {author}</ItemStyle>
      <ItemStyle
        style={{
          gridColumn: '1 / span 2'
        }}
      >
        {points > 0 ? `+${points}` : `${points}`} points
      </ItemStyle>
      <ItemStyle style={{ marginBottom: '6px', gridColumn: '1 / span 2' }}>Uploaded at {timeStamp}</ItemStyle>
      <DescriptionStyle>{description}</DescriptionStyle>
      <BottomContainer>
        <>
          <GenericButton onClickFunction={DeletePost} text="DELETE" />
        </>
      </BottomContainer>
    </CardContainerStyle>
  );
};

ResourceCardAccountPage.propTypes = {
  title: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorImg: PropTypes.string.isRequired,
  previewImg: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  timeStamp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default ResourceCardAccountPage;
