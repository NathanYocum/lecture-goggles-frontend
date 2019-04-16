import React, { useContext, useReducer, useState, useLayoutEffect } from 'react';
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

  const [pointsState, setPointsState] = useState(points);

  function ChangeVote(value) {
    const token = localStorage.getItem('token');
    axios
      .post(
        `${urlToUse}/v1/vote/onPost/${id}/`,
        { vote_choice: value },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then();
  }

  // Need to get persistent state from API still.
  const [voteState, dispatchVote] = useReducer((state, action) => {
    if (typeof state === 'undefined') {
      return 'none';
    }
    if (action === 'none') {
      return action;
    }
    if (state === 'upvote') {
      if (action === 'upvote') {
        ChangeVote(-1);
        setPointsState(pointsState - 1);
        return 'none';
      }
      if (action === 'downvote') {
        ChangeVote(-2);
        setPointsState(pointsState - 2);
        return action;
      }
    } else if (state === 'downvote') {
      if (action === 'upvote') {
        setPointsState(pointsState + 2);
        ChangeVote(2);
        return action;
      }
      if (action === 'downvote') {
        setPointsState(pointsState + 1);
        ChangeVote(1);
        return 'none';
      }
    } else if (state === 'none') {
      if (action === 'upvote') {
        setPointsState(pointsState + 1);
        ChangeVote(1);
        return action;
      }
      if (action === 'downvote') {
        setPointsState(pointsState - 1);
        ChangeVote(-1);
        return action;
      }
    }
    return 'none';
  }, undefined);

  useLayoutEffect(() => dispatchVote('none'), []);

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
        {pointsState > 0 ? `+${pointsState}` : `${pointsState}`} points
      </ItemStyle>
      <ItemStyle style={{ marginBottom: '6px', gridColumn: '1 / span 2' }}>Uploaded at {timeStamp}</ItemStyle>
      <DescriptionStyle>{description}</DescriptionStyle>
      <BottomContainer>
        {signedInAs === '' ? (
          <a href="/signIn">Sign in to vote!</a>
        ) : (
          <>
            <UnstyledButton onClick={() => dispatchVote('upvote')} data-testid={`${title}-upvote-arrow`}>
              <FontAwesomeIcon color={voteState === 'upvote' ? '#ff945e' : '#111111'} icon="arrow-up" />
            </UnstyledButton>
            <UnstyledButton onClick={() => dispatchVote('downvote')} data-testid={`${title}-downvote-arrow`}>
              <FontAwesomeIcon color={voteState === 'downvote' ? '#7fdbff' : '#111111'} icon="arrow-down" />
            </UnstyledButton>
            <UnstyledButton data-testid={`${title}-options`}>
              <FontAwesomeIcon onClick={() => dispatchVote('downvote')} color="#111111" icon="ellipsis-v" />
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
