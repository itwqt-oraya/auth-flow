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
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              {...register('firstName')}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              {...register('lastName')}
            />
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
