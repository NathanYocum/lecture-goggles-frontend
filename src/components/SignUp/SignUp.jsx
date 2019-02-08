/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import NavBar from '../navBar/navBar';
import GenericButton from '../button/button';
import GridBody from '../gridBody';
import useWindowWidth from '../__hooks__/useWindowWidth';
import FullLectureGogglesLogo from '../logo/fullLogo';

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
  firstName: Yup.string()
    .matches(/^[A-Za-z][A-Za-z\- ]*$/, 'Only alphabetical characters (A-Za-z) accepted')
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[A-Za-z][A-Za-z\- ]*$/, 'Only alphabetical characters (A-Za-z) accepted')
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

const SignUp = () => {
  const [isButtonDisabled, setButtonDisabled] = React.useState(true);
  const width = useWindowWidth();
  return (
    <GridBody data-testid="sign-up">
      <NavBar renderButton={width < 768} />
      <LogoStyle>
        <FullLectureGogglesLogo width={250} height={100} />
      </LogoStyle>
      <WelcomeStyle>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            institution: '',
            confirmInstructor: false // Need to figure out defaults for radio
          }}
          validationSchema={SignUpSchema}
          render={renderProps => {
            const { handleBlur, handleChange, values, errors } = renderProps;
            return (
              <form>
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
                  {errors.firstName ? (
                    <ErrorDiv data-testid="first-name-error">
                      {errors.firstName} {setButtonDisabled(true)}
                    </ErrorDiv>
                  ) : (
                    setButtonDisabled(false)
                  )}
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
                  {errors.lastName ? (
                    <ErrorDiv data-testid="last-name-error">
                      {errors.lastName} {setButtonDisabled(true)}
                    </ErrorDiv>
                  ) : (
                    setButtonDisabled(false)
                  )}
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
                    type="text"
                    name="email"
                  />
                  {errors.email ? (
                    <ErrorDiv data-testid="email-error">
                      {errors.email} {setButtonDisabled(true)}
                    </ErrorDiv>
                  ) : (
                    setButtonDisabled(false)
                  )}
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
                    type="text"
                    name="confirmEmail"
                  />
                  {errors.confirmEmail ? (
                    <ErrorDiv data-testid="confirm-email-error">
                      {errors.confirmEmail} {setButtonDisabled(true)}
                    </ErrorDiv>
                  ) : (
                    setButtonDisabled(false)
                  )}
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
                  {errors.password ? (
                    <ErrorDiv data-testid="password-error">
                      {errors.password} {setButtonDisabled(true)}
                    </ErrorDiv>
                  ) : (
                    setButtonDisabled(false)
                  )}
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
                  {errors.confirmPassword ? (
                    <ErrorDiv data-testid="confirm-password-error">
                      {errors.confirmPassword} {setButtonDisabled(true)}
                    </ErrorDiv>
                  ) : (
                    setButtonDisabled(false)
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
                  {errors.institution ? (
                    <ErrorDiv data-testid="institution-error">
                      {errors.institution} {setButtonDisabled(true)}
                    </ErrorDiv>
                  ) : (
                    setButtonDisabled(false)
                  )}
                </LabelStyle>
                <br />
                <LabelStyle htmlFor="confirmInstructor">
                  Are you an instructor at your institution?
                  <br />
                  <input data-testid="yes-confirmInstructor" type="radio" value="yes" name="confirmInstructor" />
                  Yes
                  <input data-testid="no-confirmInstructor" type="radio" value="no" name="confirmInstructor" />
                  No
                </LabelStyle>
                <br />
                <ContinueButtonStyle>
                  <GenericButton
                    disabled={isButtonDisabled}
                    backgroundColor={`${isButtonDisabled ? '#aaaaaa' : '#0074d9'}`}
                    color={`${isButtonDisabled ? '#111111' : '#ffffff'}`}
                    borderColor={`${isButtonDisabled ? '#111111' : '#0d47a1'}`}
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
};

export default SignUp;
