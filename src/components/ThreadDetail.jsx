import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchThreadDetail } from '../redux/slices/threadSlice';
import CommentForm from './CommentForm';
import Loader from './Loader'; // Impor Loader untuk menampilkan loading state

function ThreadDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.threads);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [dispatch, id]);

  if (detail.status === 'loading') {
    return <Loader />; // Tampilkan Loader saat data sedang dimuat
  }

  if (detail.status === 'failed') {
    return <p>{detail.error}</p>; // Tampilkan pesan kesalahan jika gagal memuat data
  }

  if (detail.status === 'success' && detail.thread) {
    return (
      <div className="thread-detail">
        {detail.thread.owner && (
          <>
            <img src={detail.thread.owner.avatar} alt={`${detail.thread.owner.name}'s avatar`} />
            <p>
              Created by:
              {' '}
              {detail.thread.owner.name}
            </p>
          </>
        )}
        <h2>{detail.thread.title}</h2>
        <p>{detail.thread.body}</p>

        <p>
          Comments:
          {' '}
          {detail.thread.totalComments}
        </p>
        <h3>Comments</h3>
        {detail.thread.comments && detail.thread.comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <p>
              Created by:
              {' '}
              {comment.owner.name}
            </p>
          </div>
        ))}
        <CommentForm threadId={id} />
      </div>
    );
  }

  return null;
}

export default ThreadDetail;
