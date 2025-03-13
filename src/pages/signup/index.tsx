import {SignupForm} from '@modules/signup';
export default function index() {
  return (
    <main className="container d-flex flex-column justify-content-center align-items-center h-100 py-5">
      <div className="shadow border w-100 p-4 rounded">
        <SignupForm />
      </div>
    </main>
  );
}
