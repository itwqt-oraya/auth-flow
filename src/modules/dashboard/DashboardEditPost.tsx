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
  Input,
} from 'reactstrap';
import {useEditPost, useGetPostById} from '@modules/dashboard/';

export default function DashboardEditPost({isOpen, toggle, id, reload}) {
  const {put, error} = useEditPost();
  const {fetch, response} = useGetPostById();

  const [formData, setFormData] = useState({
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

    put(formData, id);
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
