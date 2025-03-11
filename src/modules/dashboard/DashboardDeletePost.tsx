import React, {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import {useDeletePost, useGetPost} from '@modules/dashboard/';

export default function DashboardDeletePost({isOpen, toggle, id, reload}) {
  const {error, deleteApi} = useDeletePost();
  const {response} = useGetPost();

  const [formData, setFormData] = useState({
    title: '',
    message: '',
  });

  useEffect(() => {
    if (response.data) {
      setFormData({
        title: response.data.title,
        message: response.data.message,
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
      <ModalHeader>Delete Post</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title" className="fw-bold w-100 mb-3 text-center">
              Are you sure you want to delete this post?
            </Label>

            <h5 className="text-center mb-0">{formData.title}</h5>
            <p className="text-muted text-center fst-italic">
              {formData.message || 'This post does not have a message.'}
            </p>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" type="submit" onClick={handleSubmit}>
          Delete
        </Button>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
