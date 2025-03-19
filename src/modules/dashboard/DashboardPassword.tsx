import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import {useChangePassword} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';
import {USER_PASSWORD, CHANGE_PASSWORD} from '@/models/user';

export default function DashboardPassword({isOpen, toggle}: CHANGE_PASSWORD) {
  const {loading, error, changePassword} = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<USER_PASSWORD>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<USER_PASSWORD> = async (data) => {
    await changePassword(data);
    toggle();
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
    return (
      <div className="container w-100 h-100 d-flex justify-content-center align-items-center">
        <Spinner color="dark" />
      </div>
    );
  }

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
              minLength={8}
              {...register('oldPassword', {required: true, minLength: 8})}
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
              minLength={8}
              {...register('newPassword', {required: true, minLength: 8})}
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
              minLength={8}
              {...register('confirmPassword', {required: true, minLength: 8})}
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
