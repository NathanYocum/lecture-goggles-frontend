import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  url
}) => {
  const { signedInAs } = useContext(AuthContext);
  return (
    <CardContainerStyle>
      <TitleStyle>{title}</TitleStyle>
      <ItemStyle>
        {subject} - {topic}
      </ItemStyle>
      <AvatarStyle width="40px" height="40px" src={authorImg} alt="uploader avatar" />
      <PreviewA href={url}>
        <PreviewStyle width="100%" height="195px" src={previewImg} alt="preview" />{' '}
      </PreviewA>
      <PreviewLink href={url}>
        <LinkStyle>{url.length < 37 ? url : `${url.substring(0, 34)}...`}</LinkStyle>
      </PreviewLink>
      <ItemStyle>Uploaded by {author}</ItemStyle>
      <ItemStyle style={{ gridColumn: '1 / span 2' }}>{points > 0 ? `+${points}` : `${points}`} points</ItemStyle>
      <ItemStyle style={{ marginBottom: '6px', gridColumn: '1 / span 2' }}>Uploaded at {Date(timeStamp)}</ItemStyle>
      <DescriptionStyle>{description}</DescriptionStyle>
      <BottomContainer>
        {signedInAs === '' ? (
          <a href="/signIn">Sign in to vote!</a>
        ) : (
          <>
            <UnstyledButton data-testid={`${title}-upvote-arrow`}>
              <FontAwesomeIcon icon="arrow-up" />
            </UnstyledButton>
            <UnstyledButton data-testid={`${title}-downvote-arrow`}>
              <FontAwesomeIcon icon="arrow-down" />
            </UnstyledButton>
            <UnstyledButton data-testid={`${title}-options`}>
              <FontAwesomeIcon icon="ellipsis-v" />
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
  url: PropTypes.string.isRequired
};

export default ResourceCard;
