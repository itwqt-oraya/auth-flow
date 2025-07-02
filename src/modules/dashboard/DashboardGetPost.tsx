import {useState} from 'react';
import {Button} from 'reactstrap';
import {useGetPost} from '@modules/dashboard/';
import {DashboardOrder, DashboardPosts} from '@/components/Dashboard';
import {SpinLoader, ErrorLoader} from '@/components/Loader';

import {
  DashboardAddPost,
  DashboardEditPost,
  DashboardDeletePost,
} from '@modules/dashboard';

export default function DashboardGetPost() {
  const {
    response,
    loading,
    error,
    reload,
    handleQuery,
    totalPage,
    order,
    offset,
  } = useGetPost();

  const [formData, setFormData] = useState({title: '', message: ''});

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const toggleAddModal = () => setIsAddOpen(!isAddOpen);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEditModal = () => setIsEditOpen(!isEditOpen);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteOpen(!isDeleteOpen);
  const [postId, setPostId] = useState('');

  if (error) {
    return <ErrorLoader error={error} />;
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
        POST_PAYLOAD={formData}
      />
      <DashboardDeletePost
        isOpen={isDeleteOpen}
        toggle={toggleDeleteModal}
        id={postId}
        POST_PAYLOAD={formData}
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

      <DashboardOrder onChangeQuery={handleQuery} />

      {error && <p>Oops. There must be an error. Try again.</p>}

      {loading ? (
        <SpinLoader />
      ) : response.length > 0 ? (
        <DashboardPosts
          posts={response}
          toggleEditModal={toggleEditModal}
          toggleDeleteModal={toggleDeleteModal}
          setPostId={setPostId}
          setFormData={setFormData}
        />
      ) : (
        <p className="text-center mt-3">No posts available.</p>
      )}

      <div className="d-flex gap-2 align-items-center justify-content-center my-3">
        <Button
          outline
          color="dark"
          onClick={() => handleQuery(offset - 1, order)}
          disabled={offset === 0}
        >
          Back
        </Button>
        <p className="text-center mb-0">
          Page {offset + 1} of {totalPage}
        </p>
        <Button
          outline
          color="dark"
          onClick={() => handleQuery(offset + 1, order)}
          disabled={offset + 1 === totalPage}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
