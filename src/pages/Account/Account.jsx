import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import GridBody from '../../components/gridBody';
import AuthContext from '../../contexts/AuthContext';
import ResourceCardAccountPage from '../../components/resourceCard/ResourceCardAccountPage';
import GenericButton from '../../components/button/button';

const urlToUse = process.env.NODE_ENV === 'development' ? '' : 'http://api.lecturegoggles.io';

const AccountPage = () => {
  const { signedInAs } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    if (signedInAs !== '') {
      const token = localStorage.getItem('token');
      axios
        .get(`${urlToUse}/v1/post/getMyPosts`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setMyPosts(response.data.posts[0]));
    }
  }, [signedInAs]);
  return (
    <GridBody data-testid="account">
      {signedInAs === '' && <Redirect to="/signIn" from="/account" />}
      <div style={{ gridColumn: 2, gridRow: 2 }}>User: {signedInAs}</div>
      <div style={{ gridColumn: 2, gridRow: 3 }}>
        <GenericButton width="200px" height="56px" text="CHANGE MY PASSWORD" />
      </div>
      <div style={{ gridColumn: 2, gridRow: 4 }}>
        <GenericButton width="200px" height="56px" text="ADD A PROFILE IMAGE" />
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
