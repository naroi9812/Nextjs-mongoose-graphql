import React from "react";

const UserInfo = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "7rem",
        backgroundColor: "yellow",
        textAlign: "center",
      }}
    >
      <h1>User: {props.user ? props.user.email : "null"}</h1>
      <p>Token: {props.user ? props.user.token : "Please login"}</p>
    </div>
  );
};

export default UserInfo;
