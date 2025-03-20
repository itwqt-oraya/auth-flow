import {useEffect, useState} from 'react';
import {Button} from 'reactstrap';
import {useGetPost} from '@modules/dashboard/';
import {POST} from '@/models/posts';
import {DashboardOrder, DashboardPosts} from '@/components/Dashboard';
import {SpinLoader} from '@/components/Loader';
// Modals
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
    handlePage,
    handleOrder,
    totalPage,
    offset,
  } = useGetPost();

  const [posts, setPosts] = useState<POST[] | []>([]);
  const [formData, setFormData] = useState({title: '', message: ''});

  useEffect(() => {
    if (response && !loading && !error) {
      setPosts(response);
    }
  }, [response, loading, error]);

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const toggleAddModal = () => setIsAddOpen(!isAddOpen);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEditModal = () => setIsEditOpen(!isEditOpen);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteOpen(!isDeleteOpen);
  const [postId, setPostId] = useState('');

  const handleChangeOrder = (order: string) => {
    handleOrder(order);
  };

  if (error) {
    return (
      <div className="container w-100 h-100 d-flex justify-content-center align-items-center">
        <h5 className="text-danger">{error}</h5>
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
        POST_PAYLOAD={formData}
        reload={reload}
      />

      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h6 className="mb-0 fw-semibold">Posts</h6>
          <p className="text-muted">Your posts are displayed here.</p>
        </div>

        <div className="d-flex gap-2">
          <Button
            outline
            color="dark"
            className="mb-3"
            onClick={toggleAddModal}
          >
            Create Post
          </Button>

          <Button
            outline
            color="dark"
            className="mb-3"
            onClick={() => handlePage(offset - 1)}
            disabled={offset === 0}
          >
            Back
          </Button>
          <Button
            outline
            color="dark"
            className="mb-3"
            onClick={() => handlePage(offset + 1)}
            disabled={offset + 1 === totalPage}
          >
            Next
          </Button>
        </div>
      </div>

      {/* on reload get posts again */}
      <DashboardOrder changeOrder={handleChangeOrder} />

      {error && <p>Oops. There must be an error. Try again.</p>}

      {loading ? (
        <SpinLoader />
      ) : posts.length > 0 ? (
        // <div className="container-fluid row row-cols-1 row-cols-md-3 g-2">
        //   {posts.map((post, index) => (
        //     <div
        //       className="col d-flex flex-column justify-content-between p-3 border rounded"
        //       key={index}
        //     >
        //       <div>
        //         <p className="mb-0 fw-bold text-break">{post.title}</p>
        //         <p className="mb-0 fst-italic text-muted">
        //           {transformDate(post.updatedAt)}
        //         </p>

        //         <p className="text-muted text-break">{post.message}</p>
        //       </div>

        //       <div className="d-flex gap-2">
        //         <Button
        //           outline
        //           color="dark"
        //           size="sm"
        //           onClick={() => {
        //             setPostId(post.postId);
        //             toggleEditModal();
        //           }}
        //         >
        //           Edit
        //         </Button>

        //         <Button
        //           outline
        //           color="dark"
        //           size="sm"
        //           onClick={() => {
        //             setPostId(post.postId);
        //             setFormData({title: post.title, message: post.message});
        //             toggleDeleteModal();
        //           }}
        //         >
        //           Delete
        //         </Button>
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <DashboardPosts
          posts={posts}
          toggleEditModal={toggleEditModal}
          toggleDeleteModal={toggleDeleteModal}
          setPostId={setPostId}
          setFormData={setFormData}
        />
      ) : (
        <p className="text-center mt-3">No posts available.</p>
      )}

      <div>
        <p className="text-center mt-3">
          Page {offset + 1} of {totalPage}
        </p>
      </div>
    </section>
  );
}
