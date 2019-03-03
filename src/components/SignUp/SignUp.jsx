/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import GenericButton from '../button/button';
import GridBody from '../gridBody';
import FullLectureGogglesLogo from '../logo/fullLogo';
import { InputStyle } from '../__styles__/styles';

const LogoStyle = styled.div`
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
  align-self: center;
  text-align: center;
  border-radius: 18px;
  border: 1px solid #e3e3e3;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

const WelcomeStyle = styled.div`
  grid-row: 3;
  grid-column: 2;
  background-color: #ffffff;
  color: #0d47a1;
  width: 100%;
`;

const ContinueButtonStyle = styled.div`
  grid-row: 4;
  grid-column: 2;
  justify-self: center;
  font-size: 32px;
  margin-left: 20%;
  margin-right: 20%;
  width: 60%;
`;

const LabelStyle = styled.label`
  text-align: center;
  font-size: 24px;
  display: block;
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

const SignUpSchema = Yup.object().shape({
  userName: Yup.string()
    .matches(/^[A-Za-z\-_0-9]+$/, "Only alphanumeric characters, '-' and '_' allowed")
    .required('Required'),
  firstName: Yup.string()
    .matches(/^[A-Za-z][A-Za-z\- ]*$/, 'Only alphabetical characters (A-Za-z) and hyphens accepted')
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[A-Za-z][A-Za-z\- ]*$/, 'Only alphabetical characters (A-Za-z) and hyphens accepted')
    .required('Required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Required')
    .oneOf([Yup.ref('confirmEmail')], 'Emails do not match'),
  confirmEmail: Yup.string()
    .email('Invalid Email')
    .required('Required')
    .oneOf([Yup.ref('email')], 'Emails do not match'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters long')
    .oneOf([Yup.ref('confirmPassword')], 'Passwords do not match'),
  confirmPassword: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters long')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  institution: Yup.string().required('Required')
});

function handleFormSubmit(event) {
  console.log(event);
  // Need to find what the request will look like here
  axios
    .post('/users/signup')
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

const SignUp = () => (
  <GridBody data-testid="sign-up">
    <LogoStyle>
      <FullLectureGogglesLogo width={250} height={100} />
    </LogoStyle>
    <WelcomeStyle>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          confirmEmail: '',
          password: '',
          confirmPassword: '',
          institution: '',
          confirmInstructor: 'no-confirmInstructor'
        }}
        validationSchema={SignUpSchema}
        render={renderProps => {
          const { handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, dirty } = renderProps;
          const hasErrors = !(
            dirty &&
            errors.userName === undefined &&
            errors.email === undefined &&
            errors.firstName === undefined &&
            errors.lastName === undefined &&
            errors.password === undefined &&
            errors.confirmEmail === undefined &&
            errors.confirmEmail === undefined &&
            errors.institution === undefined
          );
          return (
            <form onSubmit={handleSubmit}>
              <LabelStyle htmlFor="userName">
                User Name
                <br />
                <InputStyle
                  data-testid="user-name-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hasErrors={errors.userName}
                  value={values.userName}
                  type="text"
                  name="userName"
                />
                {errors.userName && <ErrorDiv data-testid="user-name-error">{errors.userName}</ErrorDiv>}
              </LabelStyle>
              <LabelStyle htmlFor="firstName">
                First Name
                <br />
                <InputStyle
                  data-testid="first-name-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hasErrors={errors.firstName}
                  value={values.firstName}
                  type="text"
                  name="firstName"
                />
                {errors.firstName && <ErrorDiv data-testid="first-name-error">{errors.firstName}</ErrorDiv>}
              </LabelStyle>
              <br />
              <LabelStyle htmlFor="lastName">
                Last Name
                <br />
                <InputStyle
                  data-testid="last-name-input"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasErrors={errors.lastName}
                  value={values.lastName}
                  type="text"
                  name="lastName"
                />
                {errors.lastName && <ErrorDiv data-testid="last-name-error">{errors.lastName}</ErrorDiv>}
              </LabelStyle>
              <br />
              <LabelStyle htmlFor="email">
                Email
                <br />
                <InputStyle
                  data-testid="email-input"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasErrors={errors.email}
                  value={values.email}
                  type="email"
                  name="email"
                />
                {errors.email && <ErrorDiv data-testid="email-error">{errors.email}</ErrorDiv>}
              </LabelStyle>
              <br />
              <LabelStyle htmlFor="confirmEmail">
                Confirm Email
                <br />
                <InputStyle
                  data-testid="confirm-email-input"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasErrors={errors.confirmEmail}
                  value={values.confirmEmail}
                  type="email"
                  name="confirmEmail"
                />
                {errors.confirmEmail && <ErrorDiv data-testid="confirm-email-error">{errors.confirmEmail}</ErrorDiv>}
              </LabelStyle>
              <br />
              <LabelStyle htmlFor="password">
                Password
                <br />
                <InputStyle
                  data-testid="password-input"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasErrors={errors.password}
                  value={values.password}
                  type="password"
                  name="password"
                />
                {errors.password && <ErrorDiv data-testid="password-error">{errors.password}</ErrorDiv>}
              </LabelStyle>
              <br />
              <LabelStyle htmlFor="confirmPassword">
                Confirm Password
                <br />
                <InputStyle
                  data-testid="confirm-password-input"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasErrors={errors.confirmPassword}
                  value={values.confirmPassword}
                  type="password"
                  name="confirmPassword"
                />
                {errors.confirmPassword && (
                  <ErrorDiv data-testid="confirm-password-error">{errors.confirmPassword}</ErrorDiv>
                )}
              </LabelStyle>
              <br />
              <LabelStyle htmlFor="institution">
                Institution
                <br />
                <InputStyle
                  data-testid="institution-input"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasErrors={errors.institution}
                  value={values.institution}
                  type="text"
                  name="institution"
                />
                {errors.institution && <ErrorDiv data-testid="institution-error">{errors.institution}</ErrorDiv>}
              </LabelStyle>
              <br />
              <LabelStyle value={values.confirmInstructor} data-testid="confirmInstructor" htmlFor="confirmInstructor">
                Are you an instructor at your institution?
                <br />
                <input
                  data-testid="yes-confirmInstructor"
                  type="radio"
                  value="yes-confirmInstructor"
                  name="confirmInstructor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.confirmInstructor === 'yes-confirmInstructor'}
                />
                Yes
                <input
                  data-testid="no-confirmInstructor"
                  type="radio"
                  value="no-confirmInstructor"
                  name="confirmInstructor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.confirmInstructor === 'no-confirmInstructor'}
                />
                No
              </LabelStyle>
              <br />
              <ContinueButtonStyle>
                <GenericButton
                  disabled={hasErrors || isSubmitting}
                  borderColor={hasErrors ? '#888888' : '#0d47a1'}
                  color={hasErrors ? '#333333' : '#ffffff'}
                  backgroundColor={hasErrors ? '#aaaaaa' : '#0074d9'}
                  testId="continue-button"
                  type="submit"
                  text="Continue"
                />
                <a href="/">
                  <GenericButton testId="cancel-button" backgroundColor="#90A4AE" color="#0D47A1" text="Cancel" />
                </a>
              </ContinueButtonStyle>
            </form>
          );
        }}
      />
    </WelcomeStyle>
  </GridBody>
);

export default SignUp;
