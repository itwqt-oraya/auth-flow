import {useContext} from 'react';
import {AuthContext} from '@/context';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useEditUser} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';
import {USER_UPDATE, USER_DETAILS} from '@/models/user';

export default function DashboardDetails({isOpen, toggle}: USER_DETAILS) {
  const {user} = useContext(AuthContext);
  const {error, loading, putEdit} = useEditUser();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm<USER_UPDATE>();

  const onSubmit: SubmitHandler<USER_UPDATE> = async (data) => {
    await putEdit(data);
    if (!loading) {
      toggle();
    }
  };

  const handleClose = () => {
    const defaultValues = {
      firstName: user.firstName,
      lastName: user.lastName,
    };
    reset(defaultValues);
    toggle();
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
            <span className="text-muted ms-2">
              {watch('firstName')
                ? `${watch('firstName').length} / 50`
                : `${user.firstName.length}  / 50`}
            </span>
            <input
              type="text"
              className="form-control"
              id="firstName"
              defaultValue={user.firstName}
              maxLength={50}
              {...register('firstName', {
                required: true,
                minLength: 1,
                maxLength: 50,
              })}
            />
            {errors.firstName && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label fw-semibold mb-1">
              Last Name <span className="text-danger">*</span>
            </label>
            <span className="text-muted ms-2">
              {watch('lastName')
                ? `${watch('lastName').length} / 50`
                : `${user.lastName.length} / 50`}
            </span>
            <input
              type="text"
              className="form-control"
              id="lastName"
              defaultValue={user.lastName}
              maxLength={50}
              {...register('lastName', {
                required: true,
                minLength: 1,
                maxLength: 50,
              })}
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
