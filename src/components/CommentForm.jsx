import React from 'react';

const CommentForm = ({ comment, setComment, handleCommentSubmit }) => (
  <form onSubmit={handleCommentSubmit} className="form">
    <label>Comment</label>
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      required
    />
    <button type="submit">Submit Comment</button>
  </form>
);

export default CommentForm;
