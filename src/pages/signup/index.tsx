import React from 'react';
import {SignupForm} from '@modules/signup';
export default function index() {
  return (
    <main className="container d-flex flex-column justify-content-center align-items-center h-100 p-5">
      <div className="shadow p-5 rounded">
        <h1 className="text-center mb-3">Signup</h1>
        <SignupForm />
      </div>
    </main>
  );
}
