import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from 'reactstrap';
import {useDeletePost} from '@modules/dashboard/';
import {CiWarning} from 'react-icons/ci';
import {DELETE_POST} from '@/models/posts';
import {SpinLoader} from '@/components/Loader';

export default function DashboardDeletePost({
  isOpen,
  toggle,
  id,
  POST_PAYLOAD,
  reload,
}: DELETE_POST) {
  const {error, loading, deleteApi} = useDeletePost();

  const handleSubmit = () => {
    deleteApi(id);
    if (!error) {
      toggle();
      reload();
    }
  };

  if (loading) {
    return <SpinLoader />;
  }

  if (error) {
    return (
      <div className="container w-100 h-100 d-flex justify-content-center align-items-center">
        <h5 className="text-danger">{error}</h5>
      </div>
    );
  }
  return (
    <Modal isOpen={isOpen} centered>
      <ModalHeader tag={'h6'}>
        <div>
          <h5 className="mb-1">Delete Post</h5>
          <p className="text-muted mb-0">
            Are you sure you want to delete this post?
          </p>
        </div>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <CiWarning className="text-danger w-100 fs-1 text-center mb-2" />

            <h6 className="text-center text-semibold mb-0">
              {POST_PAYLOAD.title}
            </h6>
            <p className="text-muted text-center fst-italic">
              {POST_PAYLOAD.message || 'This post does not have a message.'}
            </p>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="dark" type="submit" onClick={handleSubmit}>
          Delete
        </Button>
        <Button color="dark" outline onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
