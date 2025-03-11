import React, {useContext, useEffect, useState} from 'react';
import {getPosts} from '@api/dashboard';
import {AuthContext} from '@context/AuthContext';
import {transformDate} from '@utils/date';
import {Table, Button} from 'reactstrap';
import {Link, useLocation} from 'react-router';
import {useGetPost} from '@modules/dashboard/';
// Modals
import {
  DashboardAddPost,
  DashboardEditPost,
  DashboardDeletePost,
} from '@modules/dashboard';

export default function DashboardGetPost() {
  const {response, loading, error, reload} = useGetPost();
  const [posts, setPosts] = useState([]);

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const toggleAddModal = () => setIsAddOpen(!isAddOpen);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEditModal = () => setIsEditOpen(!isEditOpen);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteOpen(!isDeleteOpen);
  const [postId, setPostId] = useState('');

  useEffect(() => {
    if (response.data) {
      setPosts(response.data);
    }
  }, [response]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      {/* Render here the modals */}
      <DashboardAddPost
        isOpen={isAddOpen}
        toggle={toggleAddModal}
        reload={reload}
      />
      <DashboardEditPost
        isOpen={isEditOpen}
        toggle={toggleEditModal}
        id={postId}
        reload={reload}
      />
      <DashboardDeletePost
        isOpen={isDeleteOpen}
        toggle={toggleDeleteModal}
        id={postId}
        reload={reload}
      />

      <div className="d-flex align-items-center justify-content-between">
        <h3>Posts</h3>
        <Button
          outline
          color="primary"
          className="mb-3"
          onClick={toggleAddModal}
        >
          Create Post
        </Button>
      </div>

      <div className="row d-flex justify-content-around gap-2 p-2">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {posts.map((post, index) => (
          <div
            className="col-sm d-flex flex-column justify-content-between p-3 border rounded"
            key={index}
          >
            <div>
              <h5>{post.title}</h5>
              <p className="text-muted">{post.message}</p>
            </div>
            <p className="text-muted">{transformDate(post.createdAt)}</p>

            <div className="d-flex gap-2">
              <Button
                outline
                color="primary"
                size="sm"
                onClick={() => {
                  toggleEditModal();
                  setPostId(post.postId);
                }}
              >
                Edit
              </Button>

              <Button
                outline
                color="danger"
                size="sm"
                onClick={() => {
                  toggleDeleteModal();
                  setPostId(post.postId);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* <Table bordered hover responsive>
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
      </Table> */}
    </section>
  );
}
