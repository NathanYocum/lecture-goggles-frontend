import React, { useContext, useState, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import AuthContext from '../../contexts/AuthContext';
import {
  UnstyledButton,
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

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const ResourceCard = ({
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
  const { signedInAs } = useContext(AuthContext);

  const [pointState, setPoints] = useState(points);

  const createReducer = () => (state, action) => {
    const token = localStorage.getItem('token');
    if (state === 'upvote') {
      if (action === 'upvote') {
        setPoints(pointState);
        axios.post(`${urlToUse}/v1/vote/upvotePost/${id}/`, {}, { headers: { Authorization: `Bearer ${token}` } });
        return 'none';
      }
    }
    if (state === 'downvote') {
      if (action === 'downvote') {
        setPoints(pointState);
        axios.post(`${urlToUse}/v1/vote/downvotePost/${id}/`, {}, { headers: { Authorization: `Bearer ${token}` } });
        return 'none';
      }
    }
    if (action === 'upvote') {
      setPoints(pointState + 1);
      axios.post(`${urlToUse}/v1/vote/upvotePost/${id}/`, {}, { headers: { Authorization: `Bearer ${token}` } });
    }
    if (action === 'downvote') {
      setPoints(pointState - 1);
      axios.post(`${urlToUse}/v1/vote/downvotePost/${id}/`, {}, { headers: { Authorization: `Bearer ${token}` } });
    }
    return action;
  };

  const memoizedCallback = useCallback(createReducer('none'), []);

  const [voteState, dispatch] = useReducer(memoizedCallback, 'none');

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
          color: `${(() => {
            if (voteState === 'upvote') {
              return '#ff945e';
            }
            if (voteState === 'downvote') {
              return '#7fdbff';
            }
            return '';
          })()}`,
          gridColumn: '1 / span 2'
        }}
      >
        {pointState > 0 ? `+${pointState}` : `${pointState}`} points
      </ItemStyle>
      <ItemStyle style={{ marginBottom: '6px', gridColumn: '1 / span 2' }}>Uploaded at {timeStamp}</ItemStyle>
      <DescriptionStyle>{description}</DescriptionStyle>
      <BottomContainer>
        {signedInAs === '' ? (
          <a href="/signIn">Sign in to vote!</a>
        ) : (
          <>
            <UnstyledButton data-testid={`${title}-upvote-arrow`} onClick={() => dispatch('upvote')}>
              <FontAwesomeIcon color={voteState === 'upvote' ? '#ff945e' : '#111111'} icon="arrow-up" />
            </UnstyledButton>
            <UnstyledButton data-testid={`${title}-downvote-arrow`} onClick={() => dispatch('downvote')}>
              <FontAwesomeIcon color={voteState === 'downvote' ? '#7fdbff' : '#111111'} icon="arrow-down" />
            </UnstyledButton>
            <UnstyledButton data-testid={`${title}-options`}>
              <FontAwesomeIcon color="#111111" icon="ellipsis-v" />
            </UnstyledButton>
          </>
        )}
      </BottomContainer>
    </CardContainerStyle>
  );
};

ResourceCard.propTypes = {
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

export default ResourceCard;
