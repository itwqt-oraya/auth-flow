import {Button} from 'reactstrap';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useLogin} from '@modules/login';
import {LOGIN_PAYLOAD} from '@/models/user';
import {SpinLoader} from '@/components/Loader';

export default function LoginForm() {
  const {error, loading, postLogin} = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<LOGIN_PAYLOAD>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LOGIN_PAYLOAD> = async (data) => {
    await postLogin(data);
    reset();
  };

  if (loading) {
    return <SpinLoader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="alert alert-danger">{error}</div>}
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
          {...register('password', {required: true})}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-danger fst-italic">
            This field is required.
          </span>
        )}
      </div>
      <Button type="submit" color="dark" block>
        Login
      </Button>
    </form>
  );
}
