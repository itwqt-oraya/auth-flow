import React, {useContext, useEffect, useState} from 'react';
import {getPosts} from '@api/dashboard';
import {AuthContext} from '@context/AuthContext';

export default function GetPosts() {
  const {user} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   getPosts(user.token).then((data) => {
  //     console.log('Fetched Posts:', data);
  //     setPosts(data.data);
  //   });
  // }, []);

  return (
    <div>
      Get posts
      {/* {posts.map((post) => (
        <div key={post.id}>
          <h2 className="text-muted">{post.title}</h2>
          <p>{post.message}</p>
        </div>
      ))} */}
    </div>
  );
}
