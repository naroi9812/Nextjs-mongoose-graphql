import React, { useState } from "react";

const AllComment = (props) => {
  const [comments, setComments] = useState([]);
  return (
    <div className="comment-list">
      <h3>All comments</h3>
      <ul>
        {comments.map((c) => (
          <li>{abc}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllComment;
