import React, {useState, useContext} from 'react';
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
  FormText,
} from 'reactstrap';
import {createPost} from '@api/dashboard';
import {useNavigate} from 'react-router';

export default function DashboardAddPost() {
  const {user} = useContext(AuthContext);
  const nav = useNavigate();

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
    createPost(formData, user.token).then(() => {
      nav(0);
    });
  };

  const handleClose = () => {
    nav(-1);
  };

  return (
    <Modal isOpen={true} centered>
      <ModalHeader>Create Post</ModalHeader>
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
            <FormText>
              This is the name that will be displayed on your profile and in
              emails.
            </FormText>
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
            <FormText>
              This is the name that will be displayed on your profile and in
              emails.
            </FormText>
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
