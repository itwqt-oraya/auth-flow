import React, {useContext, useState} from 'react';
import {Button, Form, Input} from 'reactstrap';
import {createPost} from '@api/dashboard';
import {AuthContext} from '../../context/AuthContext';

export default function CreatePost() {
  const {user} = useContext(AuthContext);

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
    createPost(formData, user.token);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="title"
        type="text"
        placeholder="Title"
        onChange={handleChange}
      />
      <Input
        nane="message"
        type="text"
        placeholder="Message"
        onChange={handleChange}
      />
      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
