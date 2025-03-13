import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useChangePassword} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';

interface PasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserPassword {
  isOpen?: boolean;
  toggle: () => void;
}

export default function DashboardPassword({isOpen, toggle}: UserPassword) {
  const {loading, changePassword} = useChangePassword();

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
    const res = await changePassword(data);
    if (res.status === 400) {
      alert('Error changing password');
      return;
    }
    alert('Password changed successfully');
    handleClose();
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
      <ModalHeader tag={'h6'}>
        <div>
          <h5 className="mb-1">Change Password</h5>
          <p className="text-muted mb-0">Manage your account information.</p>
        </div>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label
              htmlFor="oldPassword"
              className="form-label fw-semibold mb-1"
            >
              Old Password <span className="text-danger">*</span>
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
            <label
              htmlFor="newPassword"
              className="form-label fw-semibold mb-1"
            >
              New Password <span className="text-danger">*</span>
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
            <label
              htmlFor="confirmPassword"
              className="form-label fw-semibold mb-1"
            >
              Confirm Password <span className="text-danger">*</span>
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
            <Button color="dark" type="submit">
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
