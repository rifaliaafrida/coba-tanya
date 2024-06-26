import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ThreadListItem({ thread }) {
  return (
    <div className="thread-list-item">
      <Link to={`/threads/${thread.id}`}>
        <h3>{thread.title}</h3>
        <p>{thread.body ? `${thread.body.slice(0, 100)}...` : ''}</p>
        <p>
          Created by:
          {thread.ownerName}
        </p>
        {' '}
        {/* Tampilkan ownerName di sini */}
        <p>
          Created at:
          {thread.createdAt}
        </p>
        <p>
          Comments:
          {thread.totalComments}
        </p>
      </Link>
    </div>
  );
}

ThreadListItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    ownerId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    ownerName: PropTypes.string.isRequired, // Tambahkan properti ownerName
  }).isRequired,
};

export default ThreadListItem;
