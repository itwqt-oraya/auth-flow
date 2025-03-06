import React, {useState, useEffect} from 'react';
import {createPost} from '@api/dashboard';

export default function useAddPost() {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const {data} = await createPost();
      setData(data);
    } catch (e) {
      console.error(e);
    }
  }
  return {data, reload: getData};
}
