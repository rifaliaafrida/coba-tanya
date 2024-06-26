// src/pages/ThreadPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import { fetchThreadDetail, selectThreadDetail } from '../redux/slices/threadSlice';
import Header from '../components/Header';

function ThreadPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector(selectThreadDetail);

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
  }, [dispatch, threadId]);

  return (
    <div className="thread-page">
      <Header />
      {threadDetail.status === 'loading' && <p>Loading thread...</p>}
      {threadDetail.status === 'succeeded' && <ThreadDetail />}
      {threadDetail.status === 'failed' && <p>{threadDetail.error}</p>}
    </div>
  );
}

export default ThreadPage;
