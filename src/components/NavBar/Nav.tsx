import React from 'react';
import {Link} from 'react-router';
export default function Nav() {
  return (
    <nav className="d-flex justify-between w-100 gap-2 p-3">
      <button>
        <Link to="/">Login</Link>
      </button>
      <button>
        <Link to="/signup">Signup</Link>
      </button>
    </nav>
  );
}
