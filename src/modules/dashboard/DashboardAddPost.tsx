import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {useAddPost} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';

interface PostInput {
  title: string;
  message: string;
}

export default function DashboardAddPost({isOpen, toggle, reload}) {
  const {loading, error, post} = useAddPost();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PostInput>();

  const onSubmit: SubmitHandler<PostInput> = async (data) => {
    await post(data);
    if (!error) {
      reload();
      toggle();
    }
  };

  const handleClose = () => {
    toggle();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal isOpen={isOpen} centered>
      <ModalHeader>Create Post</ModalHeader>
      <ModalBody>
        {/* serialize */}
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
