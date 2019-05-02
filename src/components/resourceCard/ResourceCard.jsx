import React, { useContext, useState, useCallback, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Formik } from 'formik';

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
  BottomContainer,
  TextAreaStyle,
  colors
} from '../__styles__/styles';
import ResourceCardDropDown from './DropDown';
import Modal from '../modal/Modal';
import GenericButton from '../button/button';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'https://api.lecturegoggles.io';

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
  id,
  vote
}) => {
  const { signedInAs, userData } = useContext(AuthContext);

  const [pointState, setPoints] = useState(() => {
    if (typeof vote !== 'undefined') {
      if (vote.vote_choice === 1) {
        return points - 1;
      }
      if (vote.vote_choice === -1) {
        return points + 1;
      }
    }
    return points;
  });

  const [dateToDisplay] = useState(() => {
    const date = new Date(timeStamp);
    return date.toDateString();
  });

  const [isShowingDropDown, setShowingDropDown] = useState(false);

  const [isShowingReportModal, setShowingReportModal] = useReducer((state, action) => {
    setShowingDropDown(false);
    return action;
  }, false);

  const [isShowingImageModal, setShowingImageModal] = useReducer((state, action) => {
    setShowingDropDown(false);
    return action;
  }, false);

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setShowingReportModal(false);
        setShowingImageModal(false);
      }
    });
  }, []);

  function reportPost(values, actions) {
    const token = localStorage.getItem('token');
    if (values.description !== '') {
      axios
        .post(
          `${urlToUse}/v1/report/createReportPost/${id}/`,
          { description: values.description },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => actions.resetForm() && actions.setSubmitting(false));
    }
  }

  function addImageToPost(values, actions) {
    const token = localStorage.getItem('token');
    if (values.description !== '') {
      axios
        .post(
          `${urlToUse}/v1/post/setPostmageOn/${id}/`,
          { url: values.url },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => actions.resetForm() && actions.setSubmitting(false));
    }
  }

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

  const [voteState, dispatch] = useReducer(memoizedCallback, 'none', () => {
    if (typeof vote !== 'undefined') {
      if (vote.vote_choice === 1) {
        setPoints(pointState + 1);
        return 'upvote';
      }
      if (vote.vote_choice === -1) {
        setPoints(pointState - 1);
        return 'downvote';
      }
    }
    return 'none';
  });

  return (
    <>
      <CardContainerStyle>
        <TitleStyle style={{ gridColumn: 1, gridRow: 1 }}>{title}</TitleStyle>
        <div style={{ gridColumn: '1 / span 2', gridRow: 2 }}>
          <ItemStyle>{subject}</ItemStyle>
          <ItemStyle>{topic}</ItemStyle>
          <div style={{ height: '5px' }} />
        </div>
        <AvatarStyle
          style={{ gridColumn: 2, gridRow: '1 / span 2', borderRadius: '50%' }}
          width="40px"
          height="40px"
          src={authorImg}
          alt="uploader avatar"
        />
        <ItemStyle style={{ gridColumn: '1 / span 2', gridRow: 3 }}>Uploaded by {author}</ItemStyle>
        <PreviewA href={url}>
          <PreviewStyle width="100%" height="195px" src={previewImg} alt="preview" />
        </PreviewA>
        <PreviewLink href={url}>
          <LinkStyle>{url.length < 37 ? url : `${url.substring(0, 34)}...`}</LinkStyle>
        </PreviewLink>
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
            gridColumn: '1 / span 2',
            gridRow: 6
          }}
        >
          {pointState > 0 ? `+${pointState}` : `${pointState}`} points
        </ItemStyle>
        <ItemStyle style={{ marginBottom: '6px', gridColumn: '1 / span 2', gridRow: 7 }}>
          Uploaded {dateToDisplay}
        </ItemStyle>
        <DescriptionStyle>{description === '' ? 'no description provided' : description}</DescriptionStyle>
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
              <UnstyledButton data-testid={`${title}-options`} onClick={() => setShowingDropDown(!isShowingDropDown)}>
                <FontAwesomeIcon color="#111111" icon="ellipsis-v" />
              </UnstyledButton>
            </>
          )}
        </BottomContainer>
        {isShowingDropDown && (
          <ResourceCardDropDown>
            <UnstyledButton
              style={{
                color: colors.primaryBlue,
                backgroundColor: '#efefef',
                width: '100%',
                height: '32px',
                borderBottom: '1px solid #e3e3e3',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setShowingReportModal(true)}
            >
              Report...
            </UnstyledButton>
            <UnstyledButton
              style={{
                color: colors.primaryBlue,
                backgroundColor: '#efefef',
                width: '100%',
                height: '32px',
                borderBottom: '1px solid #e3e3e3',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setShowingImageModal(true)}
            >
              Add Image
            </UnstyledButton>
            {userData.is_staff === true && (
              <UnstyledButton
                style={{
                  color: '#ff4300',
                  backgroundColor: '#efefef',
                  width: '100%',
                  height: '32px',
                  borderBottom: '1px solid #e3e3e3',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const token = localStorage.getItem('token');
                  axios.post(
                    `${urlToUse}/v1/post/deletePost/${id}/`,
                    {},
                    {
                      headers: { Authorization: `Bearer ${token}` }
                    }
                  );
                }}
              >
                Delete
              </UnstyledButton>
            )}
          </ResourceCardDropDown>
        )}
      </CardContainerStyle>
      <Modal isOpen={isShowingReportModal}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'auto 36px', cursor: 'pointer' }}>
          <FontAwesomeIcon
            style={{ gridRow: 1, gridColumn: 2 }}
            onClick={() => setShowingReportModal(false)}
            icon="times"
          />
          <h1 style={{ color: colors.primaryBlue }}>Report Post: {title}</h1>
          <Formik
            initialValues={{ description: '' }}
            onSubmit={reportPost}
            render={formikProps => {
              const { handleChange, handleSubmit, values } = formikProps;
              return (
                <form onSubmit={handleSubmit}>
                  <TextAreaStyle
                    onChange={handleChange}
                    name="description"
                    value={values.description}
                    placeholder="What's wrong with this post?"
                    style={{ gridColumn: '1 / span 2' }}
                  />
                  <GenericButton type="submit" text="SUBMIT" />
                </form>
              );
            }}
          />
        </div>
      </Modal>
      <Modal onAfterOpen={() => setShowingReportModal(false)} isOpen={isShowingImageModal}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'auto 36px', cursor: 'pointer' }}>
          <FontAwesomeIcon
            style={{ gridRow: 1, gridColumn: 2 }}
            onClick={() => setShowingImageModal(false)}
            icon="times"
          />
          <h1 style={{ color: colors.primaryBlue }}>Add Image to Post: {title}</h1>
          <p style={{ color: colors.primaryBlue, gridColumn: '1 / span 2' }}>Image must be a url</p>
          <Formik
            initialValues={{ url: '' }}
            onSubmit={addImageToPost}
            render={formikProps => {
              const { handleChange, handleSubmit, values } = formikProps;
              return (
                <form onSubmit={handleSubmit}>
                  <TextAreaStyle
                    onChange={handleChange}
                    name="url"
                    type="url"
                    placeholder="url"
                    value={values.url}
                    style={{ gridColumn: '1 / span 2' }}
                  />
                  <GenericButton type="submit" text="SUBMIT" />
                </form>
              );
            }}
          />
        </div>
      </Modal>
    </>
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
  id: PropTypes.number.isRequired,
  vote: PropTypes.shape({})
};

ResourceCard.defaultProps = {
  vote: undefined
};

export default ResourceCard;
