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
        <div>
          <h6 className="mb-0">Posts</h6>
          <p className="text-muted">Your posts are displayed here.</p>
        </div>
        <Button outline color="dark" className="mb-3" onClick={toggleAddModal}>
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
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 fw-bold">{post.title}</p>
                <p className="mb-0 text-muted">
                  {transformDate(post.updatedAt)}
                </p>
              </div>
              <p className="text-muted text-break">{post.message}</p>
            </div>

            <div className="d-flex gap-2">
              <Button
                outline
                color="dark"
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
                color="dark"
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
    </section>
  );
}
