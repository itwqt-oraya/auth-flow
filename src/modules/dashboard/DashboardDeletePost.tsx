import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from '@context/AuthContext';
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
import {useNavigate, useParams} from 'react-router';
import {getPost, deletePost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

export default function DashboardDeletePost() {
  const {id} = useParams();
  const {handleStatusCode, triggerReload} = useContext(AuthContext);
  const token = getCookie('token');

  const nav = useNavigate();

  useEffect(() => {
    getPost(id, token).then((res) => {
      setFormData({title: res.data.title, message: res.data.message});
    });
  }, [id, token]);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
  });

  const handleSubmit = () => {
    deletePost(id, token).then((res) => {
      handleStatusCode(res.status);
      triggerReload();
      nav(-1);
    });
  };

  const handleClose = () => {
    nav(-1);
  };

  return (
    <Modal isOpen={true} centered>
      <ModalHeader>Delete Post</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title" className="fw-bold w-100 text-center">
              Are you sure you want to delete this post?
            </Label>

            <h4 className="text-center">{formData.title}</h4>
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
