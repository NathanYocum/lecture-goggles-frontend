import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import LectureGogglesLogo from '../../components/logo/logo';
import GenericButton from '../../components/button/button';
import GridBody from '../../components/gridBody';
import { InputStyle, colors } from '../../components/__styles__/styles';
import AuthContext from '../../contexts/AuthContext';

const LogoStyle = styled.div`
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
  align-self: center;
  text-align: center;
`;

const WelcomeStyle = styled.div`
  grid-row: 3;
  grid-column: 2;
  background-color: #ffffff;
  color: #0d47a1;
  width: 100%;
`;

const ContinueButtonStyle = styled.div`
  grid-column: 2;
  background-color: #ffffff;
  justify-self: center;
  font-size: 32px;
  margin: 30px;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
`;

const ErrorDiv = styled.div`
  text-align: center;
  color: #ff4136;
`;

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Required')
});

const SignIn = () => {
  const [isRedirecting, setRedirect] = useState(false);
  const [errorState, setError] = useState(null);
  const { signedInAs, setUser } = useContext(AuthContext);
  function handleSignInSubmit(values, actions) {
    const { email, password } = values;
    const urlToUse = (() => {
      if (process.env.NODE_ENV === 'development') {
        return '';
      }
      return 'https://api.lecturegoggles.io';
    })();
    axios
      .post(`${urlToUse}/v1/users/login/`, { email, password })
      .then(({ data }) => {
        setError(null);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      })
      .then(() => {
        const token = localStorage.getItem('token');
        axios
          .get(`${urlToUse}/v1/users/auth/`, { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            const { data } = response;
            setUser(data.logged_in_as);
          })
          .then(() => {
            setRedirect(true);
          });
      })
      .catch(error => {
        setError(error);
        actions.resetForm();
        actions.setSubmitting(false);
      });
  }
  return (
    <GridBody data-testid="sign-in">
      {isRedirecting && <Redirect to="/" />}
      <LogoStyle>
        <LectureGogglesLogo width={200} height={200} />
      </LogoStyle>
      <WelcomeStyle>
        {signedInAs === '' ? (
          <>
            <h3 data-testid="sign-in-form"> Sign In </h3>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignInSchema}
              onSubmit={handleSignInSubmit}
              render={formikProps => {
                const { handleSubmit, handleBlur, handleChange, values, errors, dirty, isSubmitting } = formikProps;
                const hasErrors = !(errors.email === undefined && dirty);
                return (
                  <form data-testid="sign-in-form" onSubmit={handleSubmit}>
                    <InputStyle
                      data-testid="sign-in-email-input"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      type="email"
                      name="email"
                      emailError={errors.email}
                      hasErrors={errors.email}
                    />
                    {errors.email && <ErrorDiv data-testid="sign-in-email-error">{errors.email}</ErrorDiv>}
                    <br />
                    <InputStyle
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      data-testid="sign-in-password-input"
                      placeholder="password"
                      type="password"
                      name="password"
                    />
                    <a href="/">Forgot your password?</a>
                    <br />
                    {errorState && <div style={{ gridColumn: 2, color: '#ff4300' }}>Invalid email or password.</div>}
                    <ContinueButtonStyle>
                      <GenericButton
                        testId="sign-in-submit"
                        disabled={isSubmitting || hasErrors}
                        borderColor={hasErrors ? '#888888' : '#0d47a1'}
                        color={hasErrors ? '#333333' : '#ffffff'}
                        backgroundColor={hasErrors ? '#aaaaaa' : colors.primaryBlue}
                        width="100%"
                        height="56px"
                        type="submit"
                        text="Continue"
                      />
                      <a href="/">
                        <GenericButton backgroundColor="#90A4AE" color="#0D47A1" text="Cancel" />
                      </a>
                      <a href="/newAccount">
                        <GenericButton backgroundColor="#90A4AE" color="#0D47A1" text="Create An Account" />
                      </a>
                    </ContinueButtonStyle>
                  </form>
                );
              }}
            />
          </>
        ) : (
          <>
            <h3>You are signed in as {signedInAs}, would you like to sign out? </h3>
            <ContinueButtonStyle>
              <a href="/signIn">
                <GenericButton
                  testId="confirm-logout-button"
                  onClickFunction={() => localStorage.removeItem('token')}
                  height="56px"
                  width="50%"
                  text="Yes"
                />
              </a>
              <a href="/">
                <GenericButton
                  testId="cancel-logout-button"
                  backgroundColor="#90a4ae"
                  color={colors.primaryBlue}
                  height="56px"
                  width="50%"
                  text="No"
                />
              </a>
            </ContinueButtonStyle>
          </>
        )}
      </WelcomeStyle>
    </GridBody>
  );
};

export default SignIn;
