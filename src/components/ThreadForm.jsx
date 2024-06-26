import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewThread } from "../redux/slices/threadSlice";
import { useNavigate } from "react-router-dom";

const ThreadForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(createNewThread({ title, body }));
      setTitle("");
      setBody("");
      navigate("/home");
    } catch (error) {
      console.error("Create thread error:", error);
    }
  };

  return (
    <div>
    <form className="thread-form" onSubmit={handleSubmit}>
      
      <label className="form-label">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
        />
      <label className="form-label">Body:</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="form-textarea"
        />
      <button type="submit" className="form-button">Create Thread</button>
    </form>
        </div>
  );
};

export default ThreadForm;
