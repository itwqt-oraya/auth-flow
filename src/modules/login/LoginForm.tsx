import {Button} from 'reactstrap';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useLogin} from '@modules/login';

interface LoginInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {loading, postLogin} = useLogin();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await postLogin(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
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
          <label htmlFor="password" className="form-label fw-bold">
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
        <Button type="submit" color="primary">
          Login
        </Button>
      </form>
    </>
  );
}
