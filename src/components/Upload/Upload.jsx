import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import GenericButton from '../button/button';
import GridBody from '../gridBody';
import TabBar from './tabBar';
import { FormContainer, LabelStyle, BG, InputStyle, TextAreaStyle, SelectStyle, ErrorDiv } from '../__styles__/styles';

const UploadResourceSchema = Yup.object().shape({
  url: Yup.string()
    .url('Invalid URL')
    .required('Required'),
  title: Yup.string()
    .max(40, "Titles can't be longer than 40 characters ")
    .matches(/^[A-Za-z][A-Za-z\- ]+$/, 'Titles can only contain alpha-numeric characters, hyphens, and spaces')
    .required('Required'),
  description: Yup.string()
    .max(240, "Description can't be longer than 240 characters")
    .notRequired()
});

const UploadSubjectSchema = Yup.object().shape({
  subjectName: Yup.string()
    .max(40, "Subjects can't be longer than 40 characters")
    .matches(/^[A-Za-z][A-Za-z\- ]+$/, 'Subjects can only contain alpha-numeric characters, hyphens, and spaces')
    .required('Required')
});

const UploadTopicSchema = Yup.object().shape({
  topicName: Yup.string()
    .max(40, "Topics can't be longer than 40 characters")
    .matches(/[A-Za-z\- ]/, 'Topics can only contain alpha-numeric characters, hyphens, and spaces')
    .required('Required'),
  topicBelongsTo: Yup.string()
    .max(40, "Subject can't be longer than 40 characters")
    .required('Required')
});

const UploadPage = () => {
  const [currentTab, setCurrentTab] = React.useState('Resource');
  const formErrors = React.useRef(null);
  const inFocusElt = React.useRef(null);

  const [valueState, updateValueState] = React.useState({
    selectedTab: currentTab,
    url: '',
    title: '',
    description: '',
    subject: '',
    topic: '',
    subjectName: '',
    topicName: '',
    topicBelongsTo: ''
  });
  const [isButtonDisabled, dispatchButton] = React.useReducer((state, action) => {
    const { errors } = action;
    if (Object.keys(errors).length === 0 && state === true) {
      return false;
    }
    if (state === false) {
      return true;
    }
    return state;
  }, true);

  let schemaToUse;

  if (currentTab === 'Resource') {
    schemaToUse = UploadResourceSchema;
  } else if (currentTab === 'Subject') {
    schemaToUse = UploadSubjectSchema;
  } else if (currentTab === 'Topic') {
    schemaToUse = UploadTopicSchema;
  }

  let formToRender = () => <div>Oops! Try refreshing the page, or contact support if the issue persists.</div>;
  formToRender = formikProps => {
    const { values, errors, handleBlur, handleChange, isSubmitting } = formikProps;
    formErrors.current = errors;
    return (
      <form>
        {currentTab === 'Resource' && (
          <>
            <LabelStyle htmlFor="url">URL</LabelStyle>
            <InputStyle
              ref={inFocusElt}
              data-testid="url-upload-input"
              type="url"
              onBlur={e => {
                updateValueState(values);
                dispatchButton({ errors: formErrors.current });
                handleBlur(e);
              }}
              onChange={handleChange}
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
                updateValueState(values);
                dispatchButton({ errors: formErrors.current });
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
              disabled={isSubmitting || isButtonDisabled}
              backgroundColor={`${isButtonDisabled ? '#aaaaaa' : '#0074d9'}`}
              color={`${isButtonDisabled ? '#111111' : '#ffffff'}`}
              borderColor={`${isButtonDisabled ? '#111111' : '#0d47a1'}`}
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
              data-testid="subjectName-upload-input"
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
              disabled={isSubmitting || isButtonDisabled}
              backgroundColor={`${isButtonDisabled ? '#aaaaaa' : '#0074d9'}`}
              color={`${isButtonDisabled ? '#111111' : '#ffffff'}`}
              borderColor={`${isButtonDisabled ? '#111111' : '#0d47a1'}`}
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
              disabled={isSubmitting || isButtonDisabled}
              backgroundColor={`${isButtonDisabled ? '#aaaaaa' : '#0074d9'}`}
              color={`${isButtonDisabled ? '#111111' : '#ffffff'}`}
              borderColor={`${isButtonDisabled ? '#111111' : '#0d47a1'}`}
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
    mapPropsToValues: () => valueState,
    validationSchema: schemaToUse,
    displayName: 'Upload Form'
  })(formToRender);

  return (
    <GridBody data-testid="upload">
      <BG />
      <FormContainer>
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
    </GridBody>
  );
};

export default UploadPage;
