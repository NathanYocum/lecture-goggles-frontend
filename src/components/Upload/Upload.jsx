import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import NavBar from '../navBar/navBar';
import GridBody from '../gridBody';

const FormContainer = styled.div`
  grid-column: 2;
  grid-row: 2;
`;

class UploadPage extends React.Component {
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
      <GridBody data-testid="upload">
        <NavBar renderButton={width < 768} />
        <FormContainer>
          <h1>Upload Resource</h1>
          <Formik
            initialValues={{ url: 'https://lecturegoggles.io' }}
            render={props => (
              <Form>
                <Field type="url" onChange={props.handleChange} value={props.values.url} />
              </Form>
            )}
          />
        </FormContainer>
      </GridBody>
    );
  }
}

export default UploadPage;
