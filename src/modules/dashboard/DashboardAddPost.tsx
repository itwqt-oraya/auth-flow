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
import {getCookie} from '@utils/cookie';

export default function DashboardAddPost({isOpen, toggle}) {
  const {handleStatusCode, triggerReload} = useContext(AuthContext);
  const token = getCookie('token');
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
    if (!formData.title || !formData.message) {
      alert('Please fill out all fields');
      return;
    }

    e.preventDefault();
    // form crud login sign
    // api call: isloading, onsubmit
    // https://github.com/QualityTrade/iaf-frontend-datacontributor/blob/main/src/views/certification-bodies/v2/view/cb-standards/view/key-locations/assign/index.js#L16
    createPost(formData, token).then((res) => {
      handleStatusCode(res.status);
      triggerReload();
      toggle();
    });
  };

  const handleClose = () => {
    toggle();
  };

  return (
    <Modal isOpen={isOpen} centered>
      <ModalHeader>Create Post</ModalHeader>
      <ModalBody>
        {/* serialize */}
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
            <FormText>Add a nice title.</FormText>
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
            <FormText>And then a message to go with it!</FormText>
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
