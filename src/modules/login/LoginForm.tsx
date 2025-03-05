import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';

export default function LoginForm() {
  // firstName, lastName, email, password
  return (
    <Form>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input type="password" placeholder="Password" />
      </FormGroup>
      <Button color="success" type="submit">
        Login
      </Button>
    </Form>
  );
}
