import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {signup} from '@api/auth';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      alert('Please fill out all fields');
      return;
    }

    signup(formData).then((res) => {
      if (res.status === 200) {
        alert('Signup successful');
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
        />
      </FormGroup>
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
        Submit
      </Button>
    </Form>
  );
}
