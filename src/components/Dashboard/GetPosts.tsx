import React, {useContext, useEffect, useState} from 'react';
import {getPosts} from '@api/dashboard';
import {AuthContext} from '@context/AuthContext';
import {transformDate} from '@utils/date';
import {Table, Button} from 'reactstrap';
import {Link, useLocation} from 'react-router';

export default function GetPosts() {
  const {user} = useContext(AuthContext);
  const token = user.token;
  const location = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(token).then((res) => {
      setPosts(res.data.data);
    });
  }, [token]);

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td>{transformDate(post.createdAt)}</td>
            <td>{post.title}</td>
            <td>{post.message}</td>
            <td className="d-flex gap-2">
              <Link
                to={`/dashboard/post/edit/${post.postId}`}
                state={{background: location}}
              >
                <Button color="primary" size="sm">
                  Edit
                </Button>
              </Link>
              <Link
                to={`/dashboard/post/delete/${post.postId}`}
                state={{background: location}}
              >
                <Button color="danger" size="sm">
                  Delete
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
