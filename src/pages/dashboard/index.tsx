import React from 'react';
import {GetPosts} from '@components/Dashboard';

export default function index() {
  return (
    <main className="container py-3">
      <h3>Your Posts</h3>
      <GetPosts />
    </main>
  );
}
