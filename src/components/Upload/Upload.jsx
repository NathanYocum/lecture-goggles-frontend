import React, { useState, useContext } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import GenericButton from '../button/button';
import GridBody from '../gridBody';
import TabBar from './tabBar';
import { FormContainer, LabelStyle, BG, InputStyle, TextAreaStyle, SelectStyle, ErrorDiv } from '../__styles__/styles';
import AuthContext from '../../contexts/AuthContext';

const UploadSchema = Yup.object().shape({
  url: Yup.string()
    .url('Invalid URL')
    .required('Required'),
  title: Yup.string()
    .max(40, "Titles can't be longer than 40 characters ")
    .matches(/^[A-Za-z][A-Za-z\- ]+$/, 'Titles can only contain alpha-numeric characters, hyphens, and spaces')
    .required('Required'),
  description: Yup.string()
    .max(240, "Description can't be longer than 240 characters")
    .notRequired(),
  subjectName: Yup.string()
    .max(40, "Subjects can't be longer than 40 characters")
    .matches(/^[A-Za-z][A-Za-z\- ]+$/, 'Subjects can only contain alpha-numeric characters, hyphens, and spaces')
    .required('Required'),
  topicName: Yup.string()
    .max(40, "Topics can't be longer than 40 characters")
    .matches(/[A-Za-z\- ]/, 'Topics can only contain alpha-numeric characters, hyphens, and spaces')
    .required('Required'),
  topicBelongsTo: Yup.string()
    .max(40, "Subject can't be longer than 40 characters")
    .required('Required')
});

const UploadPage = () => {
  const [currentTab, setCurrentTab] = useState('Resource');
  const { signedInAs } = useContext(AuthContext);
  let formToRender = () => <div>Oops! Try refreshing the page, or contact support if the issue persists.</div>;
  formToRender = formikProps => {
    const { dirty, values, errors, handleBlur, handleChange, isSubmitting } = formikProps;
    const hasErrors = (errs => {
      if (!dirty) {
        return true;
      }
      if (currentTab === 'Resource') {
        return !(errs.url === undefined && errs.title === undefined);
      }
      if (currentTab === 'Subject') {
        return !(errs.subjectName === undefined);
      }
      if (currentTab === 'Topic') {
        return !(errs.topicName === undefined && errs.topicBelongsTo === undefined);
      }
      return false;
    })(errors);
    return (
      <form>
        {currentTab === 'Resource' && (
          <>
            <LabelStyle htmlFor="url">URL</LabelStyle>
            <InputStyle
              data-testid="url-upload-input"
              type="url"
              onBlur={e => {
                handleBlur(e);
              }}
              onChange={e => {
                handleChange(e);
              }}
              hasErrors={errors.url}
              value={values.url}
              name="url"
            />
            {errors.url ? <ErrorDiv data-testid="url-upload-error">{errors.url}</ErrorDiv> : <></>}
            <LabelStyle htmlFor="title">Title</LabelStyle>
            <InputStyle
              data-testid="title-upload-input"
              hasErrors={errors.title}
              type="text"
              onBlur={e => {
                handleBlur(e);
              }}
              onChange={handleChange}
              value={values.title}
              name="title"
            />
            {errors.title ? <ErrorDiv data-testid="title-upload-error">{errors.title}</ErrorDiv> : <></>}
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
              <ErrorDiv data-testid="description-upload-error">{errors.description}</ErrorDiv>
            ) : (
              <></>
            )}
            Subject
            <SelectStyle type="text" onBlur={handleBlur} onChange={handleChange} value={values.subject} name="subject">
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
              disabled={isSubmitting || hasErrors}
              borderColor={hasErrors ? '#888888' : '#0d47a1'}
              color={hasErrors ? '#333333' : '#ffffff'}
              backgroundColor={hasErrors ? '#aaaaaa' : '#0074d9'}
              type="submit"
              height="56px"
              width="40%"
              text="SUBMIT"
            />
          </>
        )}
        {currentTab === 'Subject' && (
          <>
            <LabelStyle htmlFor="subjectName">Subject Name</LabelStyle>
            <InputStyle
              data-testid="subject-name-upload-input"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              hasErrors={errors.subjectName}
              value={values.subjectName}
              name="subjectName"
            />
            {errors.subjectName ? (
              <ErrorDiv data-testid="subject-name-upload-error">{errors.subjectName}</ErrorDiv>
            ) : (
              <></>
            )}
            <GenericButton height="56px" width="40%" text="CANCEL" backgroundColor="#90a4ae" color="#0074d9" />
            <GenericButton
              testId="submit-button"
              disabled={isSubmitting || hasErrors}
              borderColor={hasErrors ? '#888888' : '#0d47a1'}
              color={hasErrors ? '#333333' : '#ffffff'}
              backgroundColor={hasErrors ? '#aaaaaa' : '#0074d9'}
              type="submit"
              height="56px"
              width="40%"
              text="SUBMIT"
            />
          </>
        )}
        {currentTab === 'Topic' && (
          <>
            <LabelStyle htmlFor="topicName">Topic Name</LabelStyle>
            <InputStyle
              data-testid="topic-name-upload-input"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              hasErrors={errors.topicName}
              value={values.topicName}
              name="topicName"
            />
            {errors.topicName ? <ErrorDiv data-testid="topic-name-upload-error">{errors.topicName}</ErrorDiv> : <></>}
            <LabelStyle htmlFor="topicBelongsTo">Subject</LabelStyle>
            <SelectStyle
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.topicBelongsTo}
              name="topic"
            >
              <option>Something</option>
              <option>Something else</option>
              <option>TODO</option>
            </SelectStyle>
            <GenericButton height="56px" width="40%" text="CANCEL" backgroundColor="#90a4ae" color="#0074d9" />
            <GenericButton
              testId="submit-button"
              disabled={isSubmitting || hasErrors}
              borderColor={hasErrors ? '#888888' : '#0d47a1'}
              color={hasErrors ? '#333333' : '#ffffff'}
              backgroundColor={hasErrors ? '#aaaaaa' : '#0074d9'}
              type="submit"
              height="56px"
              width="40%"
              text="SUBMIT"
            />
          </>
        )}
      </form>
    );
  };

  const FormToRender = withFormik({
    mapPropsToValues: () => ({
      selectedTab: currentTab,
      url: '',
      title: '',
      description: '',
      subject: '',
      topic: '',
      subjectName: '',
      topicName: '',
      topicBelongsTo: ''
    }),
    validationSchema: UploadSchema,
    displayName: 'Upload Form'
  })(formToRender);

  return (
    <GridBody data-testid="upload">
      <BG />
      {signedInAs === '' ? (
        <Redirect to="/signIn" from="/upload" />
      ) : (
        <FormContainer data-testid={`${currentTab.toLowerCase()}-form`}>
          <TabBar
            onClickFunction={item => {
              setCurrentTab(item);
            }}
            currentTab={currentTab}
            tabNames={['Resource', 'Subject', 'Topic']}
          />
          <h1>Upload {currentTab}</h1>
          <FormToRender />
        </FormContainer>
      )}
    </GridBody>
  );
};

export default UploadPage;
