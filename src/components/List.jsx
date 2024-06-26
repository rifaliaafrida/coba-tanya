// src/components/ThreadList.js
import ThreadListItem from "./ThreadListItem";
const ThreadList = ({ threads }) => {

    
  return (
    <div className="thread-list">
    <h2 className="title__list">Threads</h2>
    <div className="thread-cards">
      {threads && threads.length > 0 ? (
        threads.map((thread) => (
          <ThreadListItem key={thread.id} thread={thread} />
        ))
      ) : (
        <p>No threads available</p>
      )}
      </div>
    </div>
  );
};

export default ThreadList;
