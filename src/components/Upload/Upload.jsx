import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import NavBar from '../navBar/navBar';
import GenericButton from '../button/button';
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
  text-align: center;
`;

const TextAreaStyle = styled.textarea`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid #0074d9;
  min-width: 80%;
  resize: vertical;
  text-align: center;
`;

const SelectStyle = styled.select`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 4px;
  border: 1px solid #0074d9;
  background-color: #e3e3e3;
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
          initialValues={{ url: '', title: '', description: '', subject: '', topic: '' }}
          render={props => {
            // eslint-disable-next-line
            const { handleBlur, handleChange, values } = props;
            return (
              <form>
                <InputStyle type="url" onBlur={handleBlur} onChange={handleChange} value={values.url} name="url" />
                URL
                <InputStyle type="text" onBlur={handleBlur} onChange={handleChange} value={values.title} name="title" />
                Title
                <TextAreaStyle
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                />
                Description
                <SelectStyle
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subject}
                  name="subject"
                >
                  <option>Accounting</option>
                  <option>Agriculture</option>
                  <option>TODO</option>
                </SelectStyle>
                Subject
                <SelectStyle type="text" onBlur={handleBlur} onChange={handleChange} value={values.topic} name="topic">
                  <option>TODO</option>
                  <option>TODO</option>
                  <option>TODO</option>
                </SelectStyle>
                Topic
                <br />
                <GenericButton height="56px" width="40%" text="CANCEL" backgroundColor="#90a4ae" color="#0074d9" />
                <GenericButton type="submit" height="56px" width="40%" text="SUBMIT" />
              </form>
            );
          }}
        />
      </FormContainer>
    </GridBody>
  );
};

export default UploadPage;
