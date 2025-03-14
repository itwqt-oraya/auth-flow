import {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from 'reactstrap';
import {useDeletePost, useGetPostById} from '@modules/dashboard/';
import {CiWarning} from 'react-icons/ci';

interface DeletePost {
  isOpen?: boolean;
  toggle: () => void;
  id: string;
  reload: () => void;
}

interface PostData {
  title: string;
  message: string;
}

export default function DashboardDeletePost({
  isOpen,
  toggle,
  id,
  reload,
}: DeletePost) {
  const {error, deleteApi} = useDeletePost();
  const {response, fetch} = useGetPostById();

  const [formData, setFormData] = useState<PostData>({
    title: '',
    message: '',
  });

  useEffect(() => {
    fetch(id);
  }, [id]);

  useEffect(() => {
    if (response) {
      setFormData({
        title: response.title,
        message: response.message,
      });
    }
  }, [response]);

  const handleSubmit = () => {
    deleteApi(id);
    if (!error) {
      reload();
      toggle();
    }
  };

  const handleClose = () => {
    toggle();
  };

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

            <h6 className="text-center text-semibold mb-0">{formData.title}</h6>
            <p className="text-muted text-center fst-italic">
              {formData.message || 'This post does not have a message.'}
            </p>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="dark" type="submit" onClick={handleSubmit}>
          Delete
        </Button>
        <Button color="dark" outline onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
