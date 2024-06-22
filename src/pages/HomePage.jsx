// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import Header from '../components/Header';
import { fetchThreads, selectThreads } from '../redux/slices/threadSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const threads = useSelector(selectThreads);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  return (
    <div className="home-page">
      <Header />
      {threads.status === 'loading' && <p>Loading threads...</p>}
      {threads.status === 'succeeded' && <ThreadList threads={threads.data} />}
      {threads.status === 'failed' && <p>{threads.error}</p>}
    </div>
  );
};

export default HomePage;
