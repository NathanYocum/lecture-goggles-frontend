import React from 'react';
import styled from 'styled-components';
import NavBar from '../navBar/navBar';
import GridBody from '../gridBody';
import ResourceCard from '../resourceCard/ResourceCard';

const TempCardStyle = styled.div`
  grid-row: 2;
  grid-column: 2;
  box-shadow: 4px 8px 10px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid #90a4ae;
`;

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
    this.getWindowWidth = this.getWindowWidth.bind(this);
  }

  componentDidMount() {
    this.getWindowWidth();
    window.addEventListener('resize', this.getWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowWidth);
  }

  getWindowWidth() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { width } = this.state;
    return (
      <GridBody>
        <NavBar title="Resources" renderButton={width < 768} />
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
            url="http://localhost:3000/asdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
          />
        </TempCardStyle>
      </GridBody>
    );
  }
}

export default Resources;
