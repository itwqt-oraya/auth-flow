import {useEffect, useState} from 'react';
import {transformDate} from '@utils/date';
import {Button, Spinner} from 'reactstrap';
import {useGetPost} from '@modules/dashboard/';
import {sampleFunction} from '@utils/http';
// Modals
import {
  DashboardAddPost,
  DashboardEditPost,
  DashboardDeletePost,
} from '@modules/dashboard';

interface Post {
  postId: string;
  title: string;
  updatedAt: string;
  message: string;
}

export default function DashboardGetPost() {
  const {response, loading, error, reload} = useGetPost();
  sampleFunction(45);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (response.data && !loading) {
      setPosts(response.data);
    }
  }, [response]);

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const toggleAddModal = () => setIsAddOpen(!isAddOpen);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEditModal = () => setIsEditOpen(!isEditOpen);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteOpen(!isDeleteOpen);
  const [postId, setPostId] = useState('');

  if (loading) {
    return (
      <div className="container w-100 h-100 d-flex justify-content-center align-items-center">
        <Spinner color="dark" />
      </div>
    );
  }

  return (
    <section className="w-100 d-flex flex-column justify-content-around">
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
          <h6 className="mb-0 fw-semibold">Posts</h6>
          <p className="text-muted">Your posts are displayed here.</p>
        </div>
        <Button outline color="dark" className="mb-3" onClick={toggleAddModal}>
          Create Post
        </Button>
      </div>

      {error && <p>Oops. There must be an error. Try again.</p>}

      <div className="container-fluid row row-cols-1 row-cols-md-3 g-2">
        {loading && <p>Loading...</p>}
        {posts.map((post, index) => (
          <div
            className="col d-flex flex-column justify-content-between p-3 border rounded"
            key={index}
          >
            <div>
              <p className="mb-0 fw-bold text-break">{post.title}</p>
              <p className="mb-0 fst-italic text-muted">
                {transformDate(post.updatedAt)}
              </p>

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
