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
import {password} from '@api/user';
import {getCookie} from '@utils/cookie';

export default function DashboardPassword() {
  const {user, handleStatusCode, updateUser, triggerReload} =
    useContext(AuthContext);
  const token = getCookie('token');
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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

    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      alert('Please fill out all fields');
      return;
    }

    if (!samePassword(formData.newPassword, formData.confirmPassword)) {
      alert('Passwords do not match');
      return;
    }

    password(formData, token).then((res) => {
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
      <ModalHeader>Change Password</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="firstName" className="fw-bold">
              Old Password <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="newPassword" className="fw-bold">
              New Password <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="confirmPassword" className="fw-bold">
              Confirm Password <span className="text-danger">*</span>
            </Label>
            <Input
              type="text"
              name="confirmPassword"
              value={formData.confirmPassword}
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

function samePassword(password, confirmPassword) {
  return password === confirmPassword;
}
