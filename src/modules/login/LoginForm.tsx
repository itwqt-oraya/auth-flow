import React, {useState, useContext} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {login} from '@api/auth';
import {AuthContext} from '@context/AuthContext';
import {Navigate} from 'react-router';

export default function LoginForm() {
  const {loginUser, isAuthenticated} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    if (!formData.email || !formData.password) {
      alert('Please fill out all fields');
      return;
    }

    login(formData)
      .then((res) => {
        loginUser(res.data, res.status);
        if (isAuthenticated) {
          return <Navigate to="/dashboard" replace />;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </FormGroup>
        <Button outline color="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
