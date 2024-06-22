// src/components/ThreadDetail.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchThreadDetail, selectThreadDetail } from '../redux/slices/threadSlice';
import CommentForm from './CommentForm';

const ThreadDetail = () => {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector(selectThreadDetail);
  const loading = useSelector((state) => state.threads.threadDetail.status === 'loading');
  const error = useSelector((state) => state.threads.threadDetail.error);

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
  }, [dispatch, threadId]);

  return (
    <div className="thread-detail">
      {loading && <p>Loading thread...</p>}
      {error && <p>{error}</p>}
      {threadDetail && (
        <>
          <h2>{threadDetail.title}</h2>
          <p>{threadDetail.body}</p>
          <p>Created by: {threadDetail.ownerId}</p>
          <p>Comments: {threadDetail.totalComments}</p>
          <h3>Comments</h3>
          {threadDetail.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <p>Created by: {comment.ownerId}</p>
            </div>
          ))}
          <CommentForm threadId={threadId} />
        </>
      )}
    </div>
  );
};

export default ThreadDetail;
