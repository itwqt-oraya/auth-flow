import React, {useContext, useEffect, useState} from 'react';
import {getPosts} from '@api/dashboard';
import {getCookie} from '@utils/cookie';
import {AuthContext} from '@context/AuthContext';
import {transformDate} from '@utils/date';
import {Table, Button} from 'reactstrap';
import {Link, useLocation} from 'react-router';

export default function DashboardGetPost() {
  const {handleStatusCode, reload} = useContext(AuthContext);
  const token = getCookie('token');
  const location = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(token).then((res) => {
      handleStatusCode(res.status);
      setPosts(res.data.data);
    });
  }, [token, handleStatusCode, reload]);

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Posts</h3>
        <Link
          to="/dashboard/post"
          state={{background: location}}
          className="text-decoration-none"
        >
          <Button outline color="primary" className="mb-3">
            Create Post
          </Button>
        </Link>
      </div>

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
              <td>
                <Link
                  to={`/dashboard/post/edit/${post.postId}`}
                  state={{background: location}}
                >
                  <Button outline color="primary" size="sm">
                    Edit
                  </Button>
                </Link>
                <Link
                  to={`/dashboard/post/delete/${post.postId}`}
                  state={{background: location}}
                >
                  <Button outline color="danger" size="sm">
                    Delete
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
