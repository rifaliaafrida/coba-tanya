// src/components/ThreadList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads, selectThreads } from '../redux/slices/threadSlice';
import ThreadListItem from './ThreadListItem';

const ThreadList = () => {
  const dispatch = useDispatch();
  const threads = useSelector(selectThreads);
  const loading = useSelector((state) => state.threads.status === 'loading');
  const error = useSelector((state) => state.threads.error);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  return (
    <div className="thread-list">
      <h2>Threads</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {threads && threads.length > 0 ? (
        threads.map((thread) => (
          <ThreadListItem key={thread.id} thread={thread} />
        ))
      ) : (
        !loading && <p>No threads available</p>
      )}
    </div>
  );
};

export default ThreadList;
