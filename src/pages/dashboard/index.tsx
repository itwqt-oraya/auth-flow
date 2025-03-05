import React from 'react';
import {CreatePost, GetPosts} from '@components/Dashboard';

export default function index() {
  return (
    <div>
      {/* Input */}
      <CreatePost />
      {/* List */}
      <GetPosts />
    </div>
  );
}
