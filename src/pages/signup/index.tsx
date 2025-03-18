import {SignupForm} from '@modules/signup';
export default function index() {
  return (
    <main className="container d-flex flex-column justify-content-center align-items-center h-100 py-5">
      <div className="shadow border w-100 p-4 rounded">
        <h1 className="text-center text-semibold mb-3">Register</h1>
        <SignupForm />
      </div>
    </main>
  );
}
