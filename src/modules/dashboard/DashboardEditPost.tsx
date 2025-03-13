import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useEditPost, useGetPostById} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';

interface PostInput {
  title: string;
  message: string;
}

export default function DashboardEditPost({
  isOpen,
  toggle,
  id,
  reload,
}: {
  isOpen: boolean;
  toggle: () => void;
  id: string;
  reload: () => void;
}) {
  const {put, error} = useEditPost();
  const {fetch, response} = useGetPostById();

  useEffect(() => {
    if (isOpen) {
      fetch(id);
    }
  }, [isOpen, id]);

  useEffect(() => {
    if (response) {
      const {title, message} = response;
      const defaultValues = {
        title,
        message,
      };
      reset(defaultValues);
    }
  }, [response]);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<PostInput>({
    defaultValues: {
      title: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<PostInput> = async (data) => {
    await put(data, id);
    if (!error) {
      reload();
      toggle();
    }
  };

  const handleClose = () => {
    const defaultValues = {
      title: response?.title,
      message: response?.message,
    };
    reset(defaultValues);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} centered>
      <ModalHeader tag={'h6'}>
        <div>
          <h5 className="mb-1">Edit Post</h5>
          <p className="text-muted mb-0">
            Changes will apply to this specific post.
          </p>
        </div>
      </ModalHeader>
      <ModalBody>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold mb-1">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="title"
              {...register('title', {required: true})}
            />
            {errors.title && (
              <span className="text-danger fst-italic">
                This field is required.
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label fw-semibold mb-1">
              Message <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="message"
              {...register('message', {required: true})}
            />
            {errors.message && (
              <span className="text-danger fst-italic">
                This field is required.
              </span>
            )}
          </div>

          <ModalFooter>
            <Button color="dark" type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
            <Button color="dark" outline onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
}
