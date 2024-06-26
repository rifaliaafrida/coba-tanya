// src/components/ThreadDetail.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchThreadDetail } from "../redux/slices/threadSlice";
import CommentForm from "./CommentForm";

const ThreadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.threads);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [dispatch, id]);

  return (
    <div className="thread-detail">
      {detail.status === "loading" && <p>Loading thread...</p>}
      {detail.status === "failesd" && <p>{detail.error}</p>}
      {detail.status === "success" && (
        <>
          <h2>{detail.thread.title}</h2>
          <p>{detail.thread.body}</p>
          <p>Created by: {detail.thread.owner.name}</p>
          <p>Comments: {detail.thread.totalComments}</p>
          <h3>Comments</h3>
          {detail.thread.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <p>Created by: {comment.owner.name}</p>
            </div>
          ))}
          <CommentForm threadId={id} />
        </>
      )}
    </div>
  );
};

export default ThreadDetail;
