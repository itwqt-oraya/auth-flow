import {Button, Spinner} from 'reactstrap';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useSignup} from '@modules/signup';
import {SIGNUP_PAYLOAD} from '@/models/user';

export default function SignupForm() {
  const {error, loading, postSignup} = useSignup();

  const {
    register,
    handleSubmit,
    reset,
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
    reset();
  };

  if (loading) {
    return (
      <div className="container w-100 h-100 d-flex justify-content-center align-items-center">
        <Spinner color="dark" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label fw-semibold">
          First Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control mb-2"
          id="firstName"
          {...register('firstName', {required: true, minLength: 1})}
          title="Maximum of 50 characters"
          placeholder="Enter your first name"
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
          {...register('lastName', {required: true, minLength: 1})}
          title="Maximum of 50 characters"
          placeholder="Enter your last name"
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
          placeholder="youremail@email.com"
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
          minLength={8}
          {...register('password', {required: true, minLength: 8})}
          title="Minimum of 8 characters"
          placeholder="Enter your password"
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
