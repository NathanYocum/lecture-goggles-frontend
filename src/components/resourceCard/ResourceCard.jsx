import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
}) => (
  <CardContainerStyle>
    <TitleStyle>{title}</TitleStyle>
    <ItemStyle>
      {subject} - {topic}
    </ItemStyle>
    <ItemStyle>Uploaded by {author}</ItemStyle>
    <AvatarStyle width="40px" height="40px" src={authorImg} alt="uploader avatar" />
    <PreviewA href={url}>
      <PreviewStyle width="100%" height="195px" src={previewImg} alt="preview" />{' '}
    </PreviewA>
    <PreviewLink>
      <LinkStyle>{url.length < 42 ? url : `${url.substring(0, 39)}...`}</LinkStyle>
    </PreviewLink>
    {/* Todo: Match style docuement for these */}
    <ItemStyle>{points > 0 ? `+${points}` : `${points}`} points</ItemStyle>
    <br />
    <ItemStyle>Uploaded {timeStamp} ago</ItemStyle>
    <br />
    <DescriptionStyle>{description}</DescriptionStyle>
    <br />
    <BottomContainer>
      <UnstyledButton data-testid={`${title}-upvote-arrow`}>
        <FontAwesomeIcon icon="arrow-up" />
      </UnstyledButton>
      <UnstyledButton data-testid={`${title}-downvote-arrow`}>
        <FontAwesomeIcon icon="arrow-down" />
      </UnstyledButton>
    </BottomContainer>
  </CardContainerStyle>
);

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
