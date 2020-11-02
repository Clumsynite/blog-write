import React, { useState, useEffect } from "react";
import { TailSpin } from "@agney/react-loading";
import { useHistory } from "react-router-dom";
import Error from "../templates/Error";
import { userLogin } from "../scripts/api-calls";

const Login = (props) => {
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    return setTimeout(() => {
      setError("");
    }, 5000);
  }, [error, setError]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setError("Username can't be Empty");
    } else if (password.trim() === "") {
      setError("Password can't be Empty");
    } else {
      setloading(true);
      try {
        const data = await userLogin({ username, password });
        setloading(false);
        if (!data.user) {
          return setError("Username or Password is wrong");
        }
        const token = data.token;
        const user = data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        props.setAuth(true);
        props.setUser(user);
        document.cookie = "login=true";
        history.push("/blogs");
      } catch (error) {
        setloading(false);
        setError(error);
      }
    }
  };

  return (
    <div className="Login">
      <div
        className="card shadow mx-auto text-center"
        style={{ width: "18rem", backgroundColor: "transparent" }}
      >
        <h3 className="card-header">Please Login</h3>
        <div className="card-body  mx-auto">
          <form method="" action="">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                required
                minLength="6"
                autoFocus
                className="form-control form-control-lg text-center"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                required
                minLength="8"
                className="form-control form-control-lg text-center"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className={`btn btn-block btn-lg ${
                loading ? "btn-primary" : "btn-outline-primary"
              }`}
              type="submit"
              onClick={submitForm}
              disabled={loading}
            >
              {!loading && "Login"}
              {loading && <TailSpin width="24" />}
            </button>
          </form>
        </div>
        {error.length > 0 && <Error error={error} />}
      </div>
    </div>
  );
};

export default Login;
