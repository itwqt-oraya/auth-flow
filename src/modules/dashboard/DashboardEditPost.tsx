import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useEditPost} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';
import {POST_PAYLOAD, EDIT_POST} from '@/models/posts';
import {useEffect} from 'react';

export default function DashboardEditPost({
  isOpen,
  toggle,
  id,
  reload,
}: EDIT_POST) {
  const {put, error, response, fetchPost} = useEditPost();

  useEffect(() => {
    if (isOpen && id) {
      fetchPost(id);
    }
  }, [isOpen, id, fetchPost]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm<POST_PAYLOAD>({
    defaultValues: {
      title: '',
      message: '',
    },
  });

  useEffect(() => {
    if (response) {
      reset(response);
    }
  }, [response, reset]);

  const onSubmit: SubmitHandler<POST_PAYLOAD> = async (data) => {
    await put(data, id);
    if (!error) {
      toggle();
      reload();
    }
  };

  if (error) {
    return (
      <div className="container w-100 h-100 d-flex justify-content-center align-items-center">
        <h5 className="text-danger">{error}</h5>
      </div>
    );
  }

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
            <span className="text-muted ms-2">
              {watch('title') ? `${watch('title').length} / 50` : '0 / 50'}
            </span>
            <input
              type="text"
              className="form-control mb-2"
              id="title"
              maxLength={50}
              {...register('title', {
                required: true,
                minLength: 1,
                maxLength: 50,
              })}
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
            <span className="text-muted ms-2">
              {watch('message')
                ? `${watch('message').length} / 255`
                : '0 / 255'}
            </span>
            <textarea
              className="form-control mb-2"
              id="message"
              maxLength={255}
              {...register('message', {
                required: true,
                minLength: 1,
                maxLength: 255,
              })}
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
            <Button color="dark" outline onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
}
