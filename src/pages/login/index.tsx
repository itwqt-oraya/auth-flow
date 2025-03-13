import {LoginForm} from '@modules/login/';

export default function index() {
  return (
    <main className="container d-flex flex-column justify-content-center align-items-center h-100 py-5">
      <div className="shadow border w-100 p-4 rounded">
        <h1 className="text-center text-semibold mb-3">Hi, welcome!</h1>
        <LoginForm />
      </div>
    </main>
  );
}
