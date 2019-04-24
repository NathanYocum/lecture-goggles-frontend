import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GenericButton from '../../components/button/button';
import GridBody from '../../components/gridBody';
import TabBar from './tabBar';
import {
  FormContainer,
  LabelStyle,
  BG,
  InputStyle,
  TextAreaStyle,
  SelectStyle,
  ErrorDiv
} from '../../components/__styles__/styles';
import AuthContext from '../../contexts/AuthContext';

function GetUploadSchema(currentTab) {
  if (currentTab === 'Resource') {
    return Yup.object().shape({
      url: Yup.string()
        .url('Invalid URL')
        .required('Required'),
      title: Yup.string()
        .max(40, "Titles can't be longer than 40 characters ")
        .matches(
          /^[([A-Za-z0-9][()[\]A-Za-z\-0-9 |_]+$/,
          'Titles can only contain alpha-numeric characters, hyphens, and spaces'
        )
        .required('Required'),
      description: Yup.string()
        .max(240, "Description can't be longer than 240 characters")
        .notRequired(),
      subject: Yup.number()
        .integer()
        .required('Required'),
      topic: Yup.number()
        .integer()
        .required('Required')
    });
  }
  if (currentTab === 'Subject') {
    return Yup.object().shape({
      subjectName: Yup.string()
        .max(40, "Subjects can't be longer than 40 characters")
        .matches(/^[A-Za-z][A-Za-z\- ]+$/, 'Subjects can only contain alpha-numeric characters, hyphens, and spaces')
        .required('Required'),
      subjectDescription: Yup.string()
        .max(240, "Description can't be longer than 240 characters")
        .notRequired()
    });
  }
  return Yup.object().shape({
    topicName: Yup.string()
      .max(40, "Topics can't be longer than 40 characters")
      .matches(/[A-Za-z\- ]/, 'Topics can only contain alpha-numeric characters, hyphens, and spaces')
      .required('Required'),
    topicDescription: Yup.string()
      .max(240, "Description can't be longer than 240 characters")
      .notRequired(),
    topicBelongsTo: Yup.string()
      .max(40, "Subject can't be longer than 40 characters")
      .required('Required')
  });
}

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const UploadPage = () => {
  const [subjects, setSubjects] = useState([{ id: '', subject: '' }]);
  const [currentSubject, setCurrentSubject] = useState('');
  const [topics, setTopics] = useState([]);
  const [currentTab, setCurrentTab] = useState('Resource');
  const [submitMessage, setSubmitMessage] = useState({ success: '', error: '' });
  const { signedInAs } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${urlToUse}/v1/subject/getAll/`).then(response => {
      if (response.data === undefined) {
        return setSubjects([]);
      }
      if (response.data.subjects[0].length !== 0) {
        return setSubjects(response.data.subjects[0].map(({ subject, id }) => ({ subject, id })));
      }
      return setSubjects([]);
    });
  }, []);

  useEffect(() => {
    if (currentSubject !== '') {
      axios.get(`${urlToUse}/v1/topic/getTopics/${currentSubject}/`).then(response => {
        if (response.data === undefined) {
          return setTopics([]);
        }
        if (response.data.topics[0].length !== 0) {
          return setTopics(response.data.topics[0]);
        }
        return setTopics([]);
      });
    }
  }, [currentSubject]);

  function createSubject(subjectName, description) {
    const token = localStorage.getItem('token');
    axios
      .post(
        `${urlToUse}/v1/subject/createSubject/`,
        {
          subject: subjectName,
          description
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        if (response.status === 200) {
          setSubmitMessage({ success: `Created subject ${subjectName}!` });
        }
      })
      .then(() => {
        axios.get(`${urlToUse}/v1/subject/getAll/`).then(response => {
          if (response.data === undefined) {
            return setSubjects([]);
          }
          if (response.data.subjects[0].length !== 0) {
            return setSubjects(response.data.subjects[0].map(({ subject, id }) => ({ subject, id })));
          }
          return setSubjects([]);
        });
      })
      .catch(error => {
        setSubmitMessage({ error: `Error ${error.response.status}: ${error.response.data.message}` });
      });
  }

  function createTopic(subjectId, topic, description) {
    const token = localStorage.getItem('token');
    axios
      .post(
        `${urlToUse}/v1/topic/createTopic/${subjectId}/`,
        {
          topic,
          description
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        if (response.status === 200) {
          setSubmitMessage({ success: `Created topic ${topic}!` });
        }
      })
      .catch(error => {
        setSubmitMessage({ error: `Error ${error.response.status}: ${error.response.data.message}` });
      });
  }

  function createResource(topicId, resource, resourceUrl, description) {
    const token = localStorage.getItem('token');
    if (topicId === '') {
      return;
    }
    axios
      .post(
        `${urlToUse}/v1/post/createPost/${topicId}/`,
        {
          resource,
          resource_url: resourceUrl,
          description
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        if (response.status === 200) {
          setSubmitMessage({ success: `Created resource ${resource}!` });
        }
      })
      .catch(error => {
        setSubmitMessage({ error: `Error ${error.response.status}: ${error.response.data.message}` });
      });
  }

  function handleFormSubmit(values, actions) {
    if (currentTab === 'Subject') {
      createSubject(
        values.subjectName.toLocaleString().toLowerCase(),
        values.subjectDescription.toLocaleString().toLowerCase()
      );
    }
    if (currentTab === 'Topic') {
      createTopic(
        values.topicBelongsTo,
        values.topicName.toLocaleString().toLowerCase(),
        values.topicDescription.toLocaleString().toLowerCase()
      );
    }
    if (currentTab === 'Resource') {
      createResource(values.topic, values.title, values.url, values.description);
    }
    actions.setSubmitting(false);
  }

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
              // Clear any submit messages
              setSubmitMessage({ success: '', error: '' });
            }}
            currentTab={currentTab}
            tabNames={['Resource', 'Subject', 'Topic']}
          />
          <h1>Upload {currentTab}</h1>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{
              subjects,
              topics,
              url: '',
              title: '',
              description: '',
              subject: currentSubject,
              topic: '',
              subjectName: '',
              subjectDescription: '',
              topicName: '',
              topicDescription: '',
              topicBelongsTo: ''
            }}
            validationSchema={GetUploadSchema(currentTab)}
            render={formikProps => {
              const { dirty, values, errors, handleBlur, handleChange, isSubmitting, handleSubmit } = formikProps;
              const hasErrors = (errs => {
                if (!dirty) {
                  return true;
                }
                if (currentTab === 'Resource') {
                  return !(
                    errs.url === undefined &&
                    errs.title === undefined &&
                    errs.description === undefined &&
                    errs.subject === undefined &&
                    errs.topic === undefined
                  );
                }
                if (currentTab === 'Subject') {
                  return !(errs.subjectName === undefined && errs.subjectDescription === undefined);
                }
                if (currentTab === 'Topic') {
                  return !(
                    errs.topicName === undefined &&
                    errs.topicDescription === undefined &&
                    errs.topicBelongsTo === undefined
                  );
                }
                return false;
              })(errors);
              return (
                <form onSubmit={handleSubmit}>
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
                      <SelectStyle
                        type="text"
                        onBlur={handleBlur}
                        onChange={e => {
                          values.topic = '';
                          handleChange(e);
                          setCurrentSubject(e.target.value);
                        }}
                        value={values.subject}
                        name="subject"
                      >
                        <option value="">Chose one</option>
                        {subjects.map(subject => (
                          <option value={subject.id} key={subject.id}>
                            {subject.subject}
                          </option>
                        ))}
                      </SelectStyle>
                      {errors.subject ? (
                        <ErrorDiv data-testid="subject-upload-error">{errors.subject}</ErrorDiv>
                      ) : (
                        <></>
                      )}
                      {values.subject !== '' && (
                        <>
                          Topic
                          <SelectStyle
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.topic}
                            name="topic"
                          >
                            <option value="">Choose One</option>
                            {topics.map(topic => (
                              <option value={topic.id} key={topic.id}>
                                {topic.topic}
                              </option>
                            ))}
                          </SelectStyle>
                          {errors.topic ? <ErrorDiv data-testid="topic-upload-error">{errors.topic}</ErrorDiv> : <></>}
                        </>
                      )}
                      <br />
                      <GenericButton
                        height="56px"
                        width="40%"
                        text="CANCEL"
                        backgroundColor="#90a4ae"
                        color="#0074d9"
                      />
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
                      <LabelStyle htmlFor="subjectDescription">Subject Description</LabelStyle>
                      <TextAreaStyle
                        data-testid="subject-description-upload-input"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.subjectDescription}
                        hasErrors={errors.subjectDescription}
                        name="subjectDescription"
                      />
                      {errors.subjectDescription ? (
                        <ErrorDiv data-testid="subject-description-upload-error">{errors.subjectDescription}</ErrorDiv>
                      ) : (
                        <></>
                      )}
                      <GenericButton
                        height="56px"
                        width="40%"
                        text="CANCEL"
                        backgroundColor="#90a4ae"
                        color="#0074d9"
                      />
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
                      {errors.topicName ? (
                        <ErrorDiv data-testid="topic-name-upload-error">{errors.topicName}</ErrorDiv>
                      ) : (
                        <></>
                      )}
                      <LabelStyle htmlFor="topicDescription">Topic Description</LabelStyle>
                      <TextAreaStyle
                        data-testid="topic-description-upload-input"
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.topicDescription}
                        hasErrors={errors.topicDescription}
                        name="topicDescription"
                      />
                      {errors.topicDescription ? (
                        <ErrorDiv data-testid="topic-description-upload-error">{errors.topicDescription}</ErrorDiv>
                      ) : (
                        <></>
                      )}
                      <LabelStyle htmlFor="topicBelongsTo">Subject</LabelStyle>
                      <SelectStyle
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.topicBelongsTo}
                        name="topicBelongsTo"
                        style={{ height: '36px' }}
                      >
                        <option value="">Choose a subject</option>
                        {subjects.map(subject => (
                          <option value={subject.id} key={subject.id}>
                            {subject.subject}
                          </option>
                        ))}
                      </SelectStyle>
                      <GenericButton
                        height="56px"
                        width="40%"
                        text="CANCEL"
                        backgroundColor="#90a4ae"
                        color="#0074d9"
                      />
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
                  {submitMessage.success && (
                    <div style={{ color: '#0074d9', marginTop: '40px', border: '1px solid #0074d9' }}>
                      <FontAwesomeIcon icon="check-circle" style={{ paddingRight: '16px' }} />
                      {submitMessage.success}
                    </div>
                  )}
                  {submitMessage.error && (
                    <div style={{ color: '#ff2200', marginTop: '40px', border: '1px solid #ff2200' }}>
                      {submitMessage.error}
                    </div>
                  )}
                </form>
              );
            }}
          />
        </FormContainer>
      )}
    </GridBody>
  );
};

export default UploadPage;
