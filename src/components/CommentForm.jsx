import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createComment } from '../redux/slices/commentSlice';

function CommentForm({ threadId }) {
  const [comment, setComment] = useState('');
  const { loading, error } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(createComment({ threadId, content: comment }));
      setComment(''); 
      navigate('/home');
    } catch (err) {
      console.error('Failed to create comment:', err);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="comment-form">
      <label className="form-label">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="form-textarea"
        placeholder="Enter your comment here..."
      />
      <button type="submit" disabled={loading} className="form-button">
        {loading ? 'Submitting...' : 'Submit Comment'}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

// Add prop-types validation for threadId
CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentForm;
