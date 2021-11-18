import axios from "axios";
import React, { useRef, useState } from "react";

const Form = (props) => {
  const [isLogin, setIsLogin] = useState("true");
  const emailRef = useRef();
  const passwordRef = useRef();

  const swithSignInUp = () => {
    setIsLogin((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.val;
    const pw = passwordRef.current.val;
    const reqBody = isLogin
      ? {
          query: `query {
      login (email: ${email}, password: ${pw}) {
          userId
          token
          tokenExpiration
      }
  }`,
        }
      : {
          query: `mutation {
        login (email: ${email}, password: ${pw}) {
          userId
        }
    }`,
        };
    const res = await axios("localhost:3000/api/graphql", {
      method: "POST",
      data: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (isLogin) {
      
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>{isLogin ? "Login" : "Create account"}</h3>
      <label htmlFor="email">Email</label>
      <input type="email" ref={emailRef} />
      <label htmlFor="password">Password</label>
      <input type="password" ref={passwordRef} />
      <button type="button" onClick={swithSignInUp}>
        swith
      </button>
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
