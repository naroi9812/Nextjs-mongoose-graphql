import React from "react";

const CommentForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <h3>Leave a comment</h3>
      <input type="text" style={{ width: "100%", height: "8rem" }} />
      <button type="submit">submit</button>
    </form>
  );
};

export default CommentForm;
