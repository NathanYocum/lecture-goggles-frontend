import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import GenericButton from '../button/button';
import GridBody from '../gridBody';

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
  background-color: #004aa7;
  width: 100%;
  height: 300px;
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
  height: 56px;
  border: ${props => (props.hasErrors ? '1px solid #ff4136' : '1px solid #0074d9')};

  :focus {
    outline-color: ${props => (props.hasErrors ? '#ff4136' : '#0074d9')};
  }
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
  margin-top: 10px;
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
    .required('Required'),
  title: Yup.string()
    .max(40, "Titles can't be over 40 characters ")
    .required('Required'),
  description: Yup.string()
    .max(240, "Description can't be longer than 240 characters")
    .notRequired()
});

const UploadPage = () => {
  const [isButtonDisabled, setButtonDisabled] = React.useState(true);
  return (
    <GridBody data-testid="upload">
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
                <LabelStyle htmlFor="title">Title</LabelStyle>
                <InputStyle
                  data-testid="title-upload-input"
                  hasErrors={errors.title}
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                />
                {errors.title ? (
                  <ErrorDiv data-testid="title-upload-error">
                    {errors.title} {setButtonDisabled(true)}
                  </ErrorDiv>
                ) : (
                  setButtonDisabled(false)
                )}
                <LabelStyle htmlFor="description">Description</LabelStyle>
                <TextAreaStyle
                  data-testid="description-upload-input"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  hasErrors={errors.description}
                  name="description"
                />
                {errors.description ? (
                  <ErrorDiv data-testid="description-upload-error">
                    {errors.description} {setButtonDisabled(true)}
                  </ErrorDiv>
                ) : (
                  setButtonDisabled(Object.keys(errors).length !== 0)
                )}
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
                  testId="submit-button"
                  disabled={isSubmitting || isButtonDisabled}
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
