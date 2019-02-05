import React from 'react';
import NavBar from '../navBar/navBar';
import GridBody from '../gridBody';

class SupportPage extends React.Component {
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
      <GridBody data-testid="support">
        <NavBar renderButton={width < 768} />
      </GridBody>
    );
  }
}

export default SupportPage;
