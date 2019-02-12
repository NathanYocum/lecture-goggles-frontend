import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
  border: ${props => (props.hasErrors ? '1px solid #ff4136' : '1px solid #0074d9')};
  text-align: center;
  height: 56px;
  font-size: 24px;
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.2);

  :focus {
    outline-color: ${props => (props.hasErrors ? '#ff4136' : '#0074d9')};
  }
`;

const TextAreaStyle = styled.textarea`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid #0074d9;
  min-width: 80%;
  resize: vertical;
  text-align: center;
  height: 56px;
`;

const SelectStyle = styled.select`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 4px;
  border: 1px solid #0074d9;
  background-color: #e3e3e3;
`;

const LabelStyle = styled.label`
  text-align: center;
  font-size: 24px;
  display: block;
  color: #0074d9;
`;

const ErrorDiv = styled.div`
  text-align: center;
  color: #ff4136;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border: 1px solid #ff4136;
  background-color: #e3e3e3;
  font-size: 16px;
`;

const UploadSchema = Yup.object().shape({
  url: Yup.string()
    .url('Invalid URL')
    .required('Required')
});

const UploadPage = () => {
  const [isButtonDisabled, setButtonDisabled] = React.useState(false);
  const width = useWindowWidth();
  return (
    <GridBody data-testid="upload">
      <NavBar renderButton={width < 768} />
      <BG />
      <FormContainer>
        <h1>Upload Resource</h1>
        <Formik
          initialValues={{ url: '', title: '', description: '', subject: '', topic: '' }}
          validationSchema={UploadSchema}
          render={renderProps => {
            const { handleBlur, handleChange, values, errors, isSubmitting } = renderProps;
            return (
              <form>
                <LabelStyle htmlFor="url">URL</LabelStyle>
                <InputStyle
                  data-testid="url-upload-input"
                  type="url"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasErrors={errors.url}
                  value={values.url}
                  name="url"
                />
                {errors.url ? (
                  <ErrorDiv data-testid="url-upload-error">
                    {errors.url} {setButtonDisabled(true)}
                  </ErrorDiv>
                ) : (
                  setButtonDisabled(false)
                )}
                Title
                <InputStyle type="text" onBlur={handleBlur} onChange={handleChange} value={values.title} name="title" />
                Description
                <TextAreaStyle
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                />
                Subject
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
                Topic
                <SelectStyle type="text" onBlur={handleBlur} onChange={handleChange} value={values.topic} name="topic">
                  <option>TODO</option>
                  <option>TODO</option>
                  <option>TODO</option>
                </SelectStyle>
                <br />
                <GenericButton height="56px" width="40%" text="CANCEL" backgroundColor="#90a4ae" color="#0074d9" />
                <GenericButton
                  disabled={isButtonDisabled || isSubmitting}
                  backgroundColor={`${isButtonDisabled ? '#aaaaaa' : '#0074d9'}`}
                  color={`${isButtonDisabled ? '#111111' : '#ffffff'}`}
                  borderColor={`${isButtonDisabled ? '#111111' : '#0d47a1'}`}
                  type="submit"
                  height="56px"
                  width="40%"
                  text="SUBMIT"
                />
              </form>
            );
          }}
        />
      </FormContainer>
    </GridBody>
  );
};

export default UploadPage;
