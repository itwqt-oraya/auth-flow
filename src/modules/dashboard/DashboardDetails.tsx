import {useContext} from 'react';
import {AuthContext} from '@context/AuthContext';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import {useEditUser} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';

interface UserInput {
  firstName: string;
  lastName: string;
}

interface UserDetails {
  isOpen?: boolean;
  toggle: () => void;
}
export default function DashboardDetails({isOpen, toggle}: UserDetails) {
  const {user} = useContext(AuthContext);
  const {error, loading, putEdit} = useEditUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<UserInput>();

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    await putEdit(data);
    toggle();
  };

  const handleClose = () => {
    const defaultValues = {
      firstName: user.firstName,
      lastName: user.lastName,
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
          <h5 className="mb-1">Update User</h5>
          <p className="text-muted mb-0">Manage your account information.</p>
        </div>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label fw-semibold mb-1">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              defaultValue={user.firstName}
              {...register('firstName', {required: true})}
            />
            {errors.firstName && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label fw-semibold mb-1">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              defaultValue={user.lastName}
              {...register('lastName', {required: true})}
            />
            {errors.lastName && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <ModalFooter>
            <Button color="dark" type="submit">
              Submit
            </Button>
            <Button outline color="dark" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
}
