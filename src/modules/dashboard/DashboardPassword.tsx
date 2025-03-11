import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useChangePassword} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';

interface PasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function DashboardPassword({isOpen, toggle}) {
  const {loading, error, isToggle, changePassword} = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<PasswordInput>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<PasswordInput> = async (data) => {
    await changePassword(data);
    if (isToggle) {
      handleClose();
    }
  };

  const handleClose = () => {
    const defaultValues = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    reset(defaultValues);
    toggle();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal isOpen={isOpen} centered>
      <ModalHeader>Change Password</ModalHeader>
      <ModalBody>
        {error && <div className="text-danger">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              {...register('oldPassword', {required: true})}
            />
            {errors.oldPassword && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              {...register('newPassword', {required: true})}
            />
            {errors.newPassword && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              {...register('confirmPassword', {required: true})}
            />
            {errors.confirmPassword && (
              <span className="text-danger">This field is required</span>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'validate' && (
                <span className="text-danger">Passwords do not match</span>
              )}
          </div>
          <ModalFooter>
            <Button color="primary" type="submit">
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
