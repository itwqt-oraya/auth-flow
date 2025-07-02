import {Button} from 'reactstrap';
import {transformDate} from '@/utils/date';
import {GET_POST} from '@/models/posts';

export default function DashboardPosts({
  posts,
  toggleEditModal,
  toggleDeleteModal,
  setPostId,
  setFormData,
}: GET_POST) {
  const handlePost = (post: GET_POST['posts'][number]) => {
    setPostId(post.postId);
    setFormData({title: post.title, message: post.message});
  };

  return (
    <>
      <div className="container-fluid row row-cols-1 row-cols-md-3 g-2">
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
                  handlePost(post);
                  toggleEditModal();
                }}
              >
                Edit
              </Button>

              <Button
                outline
                color="dark"
                size="sm"
                onClick={() => {
                  handlePost(post);
                  toggleDeleteModal();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
