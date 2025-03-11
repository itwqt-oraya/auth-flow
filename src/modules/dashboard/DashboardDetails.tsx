import React, {useContext, useEffect} from 'react';
import {AuthContext} from '@context/AuthContext';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useEditUser} from '@modules/dashboard/';
import {useForm, SubmitHandler} from 'react-hook-form';

interface UserInput {
  firstName: string;
  lastName: string;
}

export default function DashboardDetails({isOpen, toggle}) {
  const {user} = useContext(AuthContext);

  const {putEdit} = useEditUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<UserInput>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  useEffect(() => {
    const defaultValues = {
      firstName: user.firstName,
      lastName: user.lastName,
    };
    reset(defaultValues);
  }, [user]);

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
              {...(register('firstName'), {required: true})}
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
              {...(register('lastName'), {required: true})}
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
