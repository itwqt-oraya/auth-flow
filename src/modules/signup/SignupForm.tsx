import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';

export default function SignupForm() {
  return (
    <Form>
      <FormGroup>
        <Label htmlFor="firstName">First Name</Label>
        <Input type="text" placeholder="First Name" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastName">Last Name</Label>
        <Input type="text" placeholder="Last Name" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input type="password" placeholder="Password" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input type="password" placeholder="Confirm Password" />
      </FormGroup>

      <Button color="success" type="submit">
        Submit
      </Button>
    </Form>
  );
}
