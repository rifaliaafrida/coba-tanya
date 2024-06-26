import React from 'react';
import PropTypes from 'prop-types';
import ThreadListItem from './ThreadListItem';

function ThreadList({ threads, usersMap }) {
  return (
    <div className="thread-list">
      <div className="thread-cards">
        {threads.map((thread) => {
          // Check if usersMap has the ownerId
          const ownerName = usersMap[thread.ownerId] || 'Unknown';

          return (
            <ThreadListItem
              key={thread.id}
              thread={{
                ...thread,
                id: String(thread.id),
                ownerId: String(thread.ownerId),
                ownerName,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
      ownerId: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      totalComments: PropTypes.number.isRequired,
    }),
  ).isRequired,
  usersMap: PropTypes.object.isRequired,
};

export default ThreadList;
