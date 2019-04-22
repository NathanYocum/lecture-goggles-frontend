import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';

import GridBody from '../../components/gridBody';
import AuthContext from '../../contexts/AuthContext';
import ResourceCardAccountPage from '../../components/resourceCard/ResourceCardAccountPage';
import GenericButton from '../../components/button/button';
import { InputStyle } from '../../components/__styles__/styles';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const AccountPage = () => {
  const { signedInAs, userData } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [isShowingPasswordChange, setShowingPasswordChange] = useState(false);
  const [isShowingEmailChange, setShowingEmailChange] = useState(false);
  useEffect(() => {
    if (signedInAs !== '') {
      const token = localStorage.getItem('token');
      axios
        .get(`${urlToUse}/v1/post/getMyPosts/`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setMyPosts(response.data.posts[0]));
    }
  }, [signedInAs]);

  function submitPasswordChange(values, actions) {
    if (values.password === values.confirmPassword && values.password !== '') {
      const token = localStorage.getItem('token');
      axios
        .post(
          `${urlToUse}/v1/users/changePassword/`,
          { password: values.password },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => actions.setSubmitting(false) && actions.resetForm());
    }
  }

  function submitEmailChange(values, actions) {
    if (values.email === values.confirmEmail && values.email !== '') {
      const token = localStorage.getItem('token');
      axios
        .post(
          `${urlToUse}/v1/users/changeEmail/`,
          { email: values.email },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => actions.setSubmitting(false) && actions.resetForm());
    }
  }
  return (
    <GridBody data-testid="account">
      {signedInAs === '' && <Redirect to="/signIn" from="/account" />}
      <h3 style={{ gridColumn: 2, gridRow: 2 }}>Hi {signedInAs}!</h3>
      <div style={{ width: '100%', gridColumn: 2, gridRow: 3, backgroundColor: '#efefef', padding: '10px' }}>
        email: {userData.email}
        <br />
        <GenericButton
          width="200px"
          text={isShowingEmailChange ? 'CANCEL' : 'CHANGE EMAIL'}
          onClickFunction={() => setShowingEmailChange(!isShowingEmailChange)}
        />
        <br />
        {isShowingEmailChange && (
          <Formik
            onSubmit={submitEmailChange}
            initialValues={{ email: '', confirmEmail: '' }}
            render={formikProps => {
              const { handleChange, values, handleSubmit } = formikProps;
              return (
                <form
                  onSubmit={handleSubmit}
                  style={{ textAlign: 'center', backgroundColor: '#e3e3e3', padding: '20px 0px 20px' }}
                >
                  <InputStyle
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    placeholder="New Email"
                    type="email"
                  />
                  <InputStyle
                    onChange={handleChange}
                    name="confirmEmail"
                    value={values.confirmEmail}
                    placeholder="Confirm New Email"
                    type="email"
                  />
                  <GenericButton text="SUBMIT" width="125px" height="56px" type="submit" />
                </form>
              );
            }}
          />
        )}
        Name: {userData.firstname} {userData.lastname}
      </div>
      <div style={{ gridColumn: 2, gridRow: 4, textAlign: 'center' }}>
        <GenericButton
          onClickFunction={() => setShowingPasswordChange(!isShowingPasswordChange)}
          width="200px"
          height="56px"
          text={isShowingPasswordChange ? 'CANCEL' : 'CHANGE MY PASSWORD'}
        />
        {isShowingPasswordChange && (
          <Formik
            onSubmit={submitPasswordChange}
            initialValues={{ password: '', confirmPassword: '' }}
            render={formikProps => {
              const { handleChange, values, handleSubmit } = formikProps;
              return (
                <form onSubmit={handleSubmit} style={{ backgroundColor: '#e3e3e3', padding: '20px 0px 20px' }}>
                  <InputStyle
                    onChange={handleChange}
                    name="password"
                    value={values.password}
                    placeholder="New Password"
                    type="password"
                  />
                  <InputStyle
                    onChange={handleChange}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    placeholder="Confirm New Password"
                    type="password"
                  />
                  <GenericButton text="SUBMIT" width="125px" height="56px" type="submit" />
                </form>
              );
            }}
          />
        )}
      </div>
      <div style={{ gridColumn: 2, gridRow: 5 }}>
        <h1>My Posts</h1>
      </div>
      <div style={{ gridColumn: 2, gridRow: 6 }}>
        {myPosts.map(post => (
          <ResourceCardAccountPage
            key={`${post.resource_url}_${post.id}`}
            title={post.resource}
            subject={post.subject_name}
            topic={post.topic_name}
            author={post.author_name}
            authorImg="Avatar.svg"
            previewImg="Image.svg"
            points={post.upvote_count}
            description={post.description}
            timeStamp={post.created_at}
            url={post.resource_url}
            id={post.id}
          />
        ))}
      </div>
    </GridBody>
  );
};

export default AccountPage;
