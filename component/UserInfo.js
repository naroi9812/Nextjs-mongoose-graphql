import React, { useContext } from "react";
import AuthContext from "../store/auth-context";

const UserInfo = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <div
      style={{
        width: "100%",
        height: "7rem",
        backgroundColor: "yellow",
        textAlign: "center",
      }}
    >
      <h1>UserId: {authCtx.userId ? authCtx.userId : "null"}</h1>
      <p>Token: {authCtx.token ? authCtx.token : "Please login"}</p>
    </div>
  );
};

export default UserInfo;
