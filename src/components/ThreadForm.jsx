import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewThread } from '../redux/slices/threadSlice';

const ThreadForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewThread({ title, body }));
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Body:</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button type="submit">Create Thread</button>
    </form>
  );
};

export default ThreadForm;
