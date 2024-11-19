import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const hendalSubmite = (e) => {
    e.preventDefault();
  };

  const nevigate = useNavigate();

  const hendaleLogin = async () => {
    if (!email && !password) {
      setError(true);
      return false;
    }
    let result = await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

      nevigate("/");
    } else {
      alert("please enter correct details");
    }
  };

  //   aa condistion ma url ma login path nakhisu to be nahi batave login page aena mate che
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      nevigate("/");
    }
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={hendalSubmite}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && <span className="span">Enter Valid Email</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !email && (
            <span className="span">Enter Valid Password</span>
          )}
        </div>
        <button type="submit" onClick={hendaleLogin} className="signup-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
