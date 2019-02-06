import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import NavBar from '../navBar/navBar';
import GridBody from '../gridBody';
import useWindowWidth from '../__hooks__/useWindowWidth';

const FormContainer = styled.div`
  grid-column: 2;
  grid-row: 2 / span 2;
  background-color: #ffffff;
  width: 100%;
  text-align: center;
  border: 1px solid #e3e3e3;
  box-shadow: 4px 8px 10px 0px rgba(0, 0, 0, 0.2);
`;

const BG = styled.div`
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  background-color: #0074d9;
  width: 100%;
`;

const InputStyle = styled.input`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 4px;
  border: 1px solid #0074d9;
  height: 24px;
`;

const UploadPage = () => {
  const width = useWindowWidth();
  return (
    <GridBody data-testid="upload">
      <NavBar renderButton={width < 768} />
      <BG />
      <FormContainer>
        <h1>Upload Resource</h1>
        <Formik
          initialValues={{ url: '' }}
          render={props => {
            // eslint-disable-next-line
            const { handleBlur, handleChange, values } = props;
            return (
              <form>
                <InputStyle type="url" onBlur={handleBlur} onChange={handleChange} value={values.url} name="url" />
                URL
                <br />
              </form>
            );
          }}
        />
      </FormContainer>
    </GridBody>
  );
};

export default UploadPage;
