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
import {useNavigate} from 'react-router';
import {details} from '@api/user';
import {getCookie} from '@utils/cookie';

export default function DashboardDetails() {
  const {user, handleStatusCode, updateUser, triggerReload} =
    useContext(AuthContext);
  const token = getCookie('token');
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
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
    details(formData, token).then((res) => {
      updateUser(res);
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
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="firstName" className="fw-bold">
              First Name <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="lastName" className="fw-bold">
              Last Name <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
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
