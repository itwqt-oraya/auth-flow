import React, {useEffect} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useEditPost, useGetPostById} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';

interface PostInput {
  title: string;
  message: string;
}

export default function DashboardEditPost({isOpen, toggle, id, reload}) {
  const {put, error} = useEditPost();
  const {fetch, response} = useGetPostById();

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

  useEffect(() => {
    fetch(id);
  }, [id]);

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
      <ModalHeader>Edit Post</ModalHeader>
      <ModalBody>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
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
            <label htmlFor="message" className="form-label fw-bold">
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
            <Button
              color="primary"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
}
