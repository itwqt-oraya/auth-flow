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
  Input,
} from 'reactstrap';
import {useNavigate, useParams} from 'react-router';
import {getPost, updatePost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

export default function DashboardEditPost() {
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

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      alert('Please fill out all fields');
      return;
    }

    updatePost(id, formData, token).then((res) => {
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
      <ModalHeader>Edit Post</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title" className="fw-bold">
              Title <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="message" className="fw-bold">
              Message <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
