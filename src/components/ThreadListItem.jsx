// src/components/ThreadListItem.js
import React from "react";
import { Link } from "react-router-dom";

const ThreadListItem = ({ thread }) => (
  <div className="thread-list-item">
    <Link to={`/threads/${thread.id}`}>
      <h3>{thread.title}</h3>
      <p>{thread.body.slice(0, 100)}...</p>
      <p>Created by: {thread.ownerId}</p>
      <p>Created at: {thread.createdAt}</p>
      <p>Comments: {thread.totalComments}</p>
    </Link>
  </div>
);

export default ThreadListItem;
