import React, { useState, useContext } from "react";
import { request, gql } from "graphql-request";
import AuthContext from "../store/auth-context";

const Form = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState("true");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const swithSignInUp = () => {
    setIsLogin((prev) => !prev);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const signInQuery = gql`
      query {
        login(email: "${email}", password: "${password}") {
          userId
          token
          tokenExpiration
        }
      }
    `;
    const signUpQuery = gql`
      mutation {
        createUser(email: "${email}", password: "${password}") {
          _id
        }
      }
    `;
    try {
      let res;
      if (isLogin) {
        res = await request("http://localhost:3000/api/graphql", signInQuery);
      } else {
        await request("http://localhost:3000/api/graphql", signUpQuery);
        res = await request("http://localhost:3000/api/graphql", signInQuery);
      }
      authCtx.login(res.login.userId, res.login.token);
    } catch (err) {
      console.log(err);
    }
  };

  if (authCtx.userId) {
    return (
      <form>
        <button type="button" onClick={authCtx.logout}>
          Logout
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <h3>{isLogin ? "Login" : "Create account"}</h3>
      <label htmlFor="email">Email</label>
      <input type="email" value={email} onChange={emailChangeHandler} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={password}
        onChange={passwordChangeHandler}
      />
      <button type="button" onClick={swithSignInUp}>
        swith
      </button>
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
