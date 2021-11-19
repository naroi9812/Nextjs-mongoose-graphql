import React, { useContext, useRef } from "react";
import { request, gql } from "graphql-request";

import AuthContext from "../store/auth-context";

const CommentForm = (props) => {
  const authCtx = useContext(AuthContext);
  const commentRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    const body = commentRef.current.value;
    const query = gql`
      mutation {
        createComment(body: "${body}") {
          body
          createdAt
        }
      }
    `;
    const requestHeaders = { Authorization: `Bearer ${authCtx.token}` };
    try {
      const res = await request(
        "http://localhost:3000/api/graphql",
        query,
        {},
        requestHeaders
      );
      commentRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };
  if (!authCtx.userId) {
    return (
      <form>
        <h3>Please login</h3>
      </form>
    );
  }
  return (
    <form onSubmit={submitHandler}>
      <h3>Leave a comment</h3>
      <input
        type="text"
        style={{ width: "100%", height: "8rem" }}
        ref={commentRef}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default CommentForm;
