import React, {useState, useContext} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {login} from '@api/auth';
import {AuthContext} from '@context/AuthContext';
import {useNavigate} from 'react-router';

export default function LoginForm() {
  const {loginUser} = useContext(AuthContext);
  const nav = useNavigate();
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
    login(formData).then((res) => {
      loginUser(res.data);
      if (res.status === 200) {
        nav('/dashboard');
      }
    });
  };

  return (
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
      <Button color="success" type="submit">
        Login
      </Button>
    </Form>
  );
}
