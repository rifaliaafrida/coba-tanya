import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import { fetchThreadDetail, selectThreadDetail } from '../redux/slices/threadSlice';
import Header from '../components/Header';
import DataFetchingComponent from '../components/DataFetching';

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
      {/* Adjust the condition based on the correct status property */}
      {threadDetail.detail.loading && <DataFetchingComponent />}
      {threadDetail.detail.status === 'success' && <ThreadDetail />}
      {threadDetail.detail.status === 'failed' && <p>{threadDetail.detail.error}</p>}
    </div>
  );
}

export default ThreadPage;
