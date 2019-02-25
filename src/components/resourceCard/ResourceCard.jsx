import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UnstyledButton } from '../__styles__/styles';

const CardContainerStyle = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  display: grid;
  width: 345px;
  grid-template-rows: 20px 12px 12px 159px 36px repeat(2, 15px) 62px;
  grid-template-columns: auto 56px;
  font-family: 'IBMPlexSans-SemiBold';
  box-shadow: 4px 8px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 12px;
`;

const TitleStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ItemStyle = styled.div`
  font-size: 12px;
  color: #90a4ae;
`;

const DescriptionStyle = styled(ItemStyle)`
  padding-top: 10px;
`;

const AvatarStyle = styled.img`
  grid-column: 2;
  grid-row: 1 / span 3;
  align-self: center;
`;

const PreviewStyle = styled.img`
  grid-column: 1 / span 2;
  grid-row: 4 / span 2;
  align-self: center;
`;
const PreviewA = styled.a`
  grid-column: 1 / span 2;
  grid-row: 4 / span 2;
`;

const PreviewLink = styled.div`
  grid-row: 5;
  grid-column: 1 / span 2;
  background-color: rgba(38, 50, 56, 0.55);
  height: 36px;
  color: white;
  display: flex;
`;

const LinkStyle = styled.div`
  font-size: 12px;
  align-self: center;
  margin-left: 16px;
  width: 100%;
  font-family: IBMPlexMono;
`;

const BottomContainer = styled.div`
  grid-column: 2;
`;

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
