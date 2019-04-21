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
  useEffect(() => {
    if (signedInAs !== '') {
      const token = localStorage.getItem('token');
      axios
        .get(`${urlToUse}/v1/post/getMyPosts`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setMyPosts(response.data.posts[0]));
    }
  }, [signedInAs]);

  function submit(values, actions) {
    if (values.password === values.confirmPassword) {
      const token = localStorage.getItem('token');
      axios
        .post(
          `${urlToUse}/v1/users/changePassword`,
          { password: values.password },
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
        <GenericButton width="200px" text="CHANGE EMAIL" />
        <br />
        Name: {userData.firstname} {userData.lastname}
      </div>
      <div style={{ gridColumn: 2, gridRow: 4, textAlign: 'center' }}>
        <GenericButton
          onClickFunction={() => setShowingPasswordChange(!isShowingPasswordChange)}
          width="200px"
          height="56px"
          text="CHANGE MY PASSWORD"
        />

        {isShowingPasswordChange && (
          <Formik
            onSubmit={submit}
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
        <GenericButton width="200px" height="56px" text="ADD A PROFILE IMAGE" />
      </div>
      <div style={{ gridColumn: 2, gridRow: 6 }}>
        <h1>My Posts</h1>
      </div>
      <div style={{ gridColumn: 2, gridRow: 7 }}>
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
