import {Button} from 'reactstrap';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useSignup} from '@modules/signup';
import {SIGNUP_PAYLOAD} from '@/models/user';

export default function SignupForm() {
  const {loading, postSignup} = useSignup();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SIGNUP_PAYLOAD>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SIGNUP_PAYLOAD> = async (data) => {
    await postSignup(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label fw-semibold">
          First Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control mb-2"
          id="firstName"
          {...register('firstName', {required: true})}
        />
        {errors.firstName && (
          <span className="text-danger fst-italic">
            This field is required.
          </span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label fw-semibold">
          Last Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control mb-2"
          id="lastName"
          {...register('lastName', {required: true})}
        />
        {errors.lastName && (
          <span className="text-danger fst-italic">
            This field is required.
          </span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold">
          Email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          className="form-control mb-2"
          id="email"
          {...register('email', {required: true})}
        />
        {errors.email && (
          <span className="text-danger fst-italic">
            This field is required.
          </span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-semibold">
          Password <span className="text-danger">*</span>
        </label>
        <input
          type="password"
          className="form-control mb-2"
          id="password"
          {...register('password', {required: true})}
        />
        {errors.password && (
          <span className="text-danger fst-italic">
            This field is required.
          </span>
        )}
      </div>
      <Button type="submit" color="dark" block>
        Signup
      </Button>
    </form>
  );
}
