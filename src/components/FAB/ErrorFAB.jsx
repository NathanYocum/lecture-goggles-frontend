import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';

import AuthContext from '../../contexts/AuthContext';
import ExtendedFloatingActionButton from './ExtendedFAB';
import Modal from '../modal/Modal';
import GenericButton from '../button/button';
import {
  UnstyledButton,
  FABDescriptionStyle,
  ModalContainer,
  ModalTitleStyle,
  ModalDescriptionStyle,
  ErrorDescriptionStyle,
  colors,
  TextAreaStyle,
  ErrorFormContainer
} from '../__styles__/styles';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'https://' + process.env.REACT_APP_API_URI;

const ErrorFAB = () => {
  const [isShowingErrorReportModal, setShowingErrorReportModal] = useState(false);
  const { signedInAs } = useContext(AuthContext);

  useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setShowingErrorReportModal(false);
      }
    });
  }, []);

  function UploadError(values, actions) {
    const token = localStorage.getItem('token');
    if (values.description !== '') {
      if (signedInAs !== '') {
        axios.post(
          `${urlToUse}/v1/report/createReportGeneral/`,
          {
            description: values.description,
            extension: `${window.location.pathname === '/' ? '' : window.location.pathname}/`
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        axios.post(`${urlToUse}/v1/report/createReportGeneral/`, {
          description: values.description,
          extension: `${window.location.pathname}/`
        });
      }
    }
    actions.resetForm();
  }
  return (
    <>
      <ExtendedFloatingActionButton onClick={() => setShowingErrorReportModal(true)} backgroundColor="#ffffff">
        <FontAwesomeIcon icon="exclamation-triangle" color={colors.red} />
        <FABDescriptionStyle>Report an error</FABDescriptionStyle>
      </ExtendedFloatingActionButton>
      <Modal contentLabel="Error Modal" isOpen={isShowingErrorReportModal}>
        <ModalContainer>
          <UnstyledButton style={{ gridRow: 1, gridColumn: 2 }} onClick={() => setShowingErrorReportModal(false)}>
            <FontAwesomeIcon icon="times" />
          </UnstyledButton>
          <ModalTitleStyle>Report an error</ModalTitleStyle>
          <ModalDescriptionStyle>
            Lecture Goggles is actively under development. In addition to reporting directly in the site,{' '}
            <a href="https://github.com/LectureGoggles">our GitHub</a> is another way to get errors fixed on the site.
          </ModalDescriptionStyle>
          <ErrorFormContainer>
            <ErrorDescriptionStyle>Please describe your error:</ErrorDescriptionStyle>
            <Formik
              initialValues={{ description: '' }}
              onSubmit={UploadError}
              render={({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextAreaStyle
                    onChange={handleChange}
                    name="description"
                    value={values.description}
                    placeholder="Enter text here"
                  />
                  <GenericButton type="submit" height="56px" width="250px">
                    SUBMIT
                  </GenericButton>
                </form>
              )}
            />
          </ErrorFormContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ErrorFAB;
