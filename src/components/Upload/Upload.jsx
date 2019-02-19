import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import GenericButton from '../button/button';
import GridBody from '../gridBody';
import TabBar from './tabBar';
import { FormContainer, LabelStyle, BG, InputStyle, TextAreaStyle, SelectStyle, ErrorDiv } from '../__styles__/styles';

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
      <TabBar tabNames={['Resource', 'Subject', 'Topic']} />
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
