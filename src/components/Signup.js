import React, { useState, useEffect } from "react";
import { TailSpin } from "@agney/react-loading";
import { Markup } from "interweave";
import { Link } from "react-router-dom";
import Error from "../templates/Error";
import { userSignup } from "../scripts/api-calls";

const Signup = () => {
  const [loading, setloading] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setsuccess] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    return setTimeout(() => {
      setError("");
    }, 5000);
  }, [error, setError]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (firstname.trim() === "") {
      setError("Firstname can't be Empty");
    } else if (lastname.trim() === "") {
      setError("Lastname can't be Empty");
    } else if (username.trim() === "") {
      setError("Username can't be Empty");
    } else if (password.trim() === "") {
      setError("Password can't be Empty");
    } else {
      setloading(true);
      try {
        const data = await userSignup({
          firstname,
          lastname,
          username,
          password,
        });
        setloading(false);
        if (data.user) {
          setsuccess(`
          <div>Successfully created new account.</div>
          <div className="text-left>
          <div><strong>Firstname</strong>: ${data.user.firstname}</div>
          <div><strong>Lastname:</strong> ${data.user.lastname}</div>
          <div><strong>Username:</strong> ${data.user.username}</div>
          <div><strong>Password:</strong> ${password}</div>
          </div>
          `);
          setfirstname("");
          setlastname("");
          setUsername("");
          setPassword("");
        }
      } catch (error) {
        setloading(false);
        console.error(error);
      }
    }
  };

  return (
    <div className="Signup">
      <div
        className="card shadow mx-auto text-center w-75"
        style={{ backgroundColor: "transparent" }}
      >
        <h3 className="card-header">Create new account</h3>
        <div className="card-body mx-auto">
          <form method="" action="">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  placeholder="Enter Firstname"
                  name="firstname"
                  required
                  minLength="6"
                  autoFocus
                  className="form-control form-control-lg text-center"
                  onChange={(e) => setfirstname(e.target.value)}
                  value={firstname || ""}
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  placeholder="Enter Lastname"
                  name="lastname"
                  required
                  minLength="6"
                  className="form-control form-control-lg text-center"
                  onChange={(e) => setlastname(e.target.value)}
                  value={lastname || ""}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                required
                minLength="6"
                className="form-control form-control-lg text-center"
                onChange={(e) => setUsername(e.target.value)}
                value={username || ""}
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
                value={password || ""}
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
              {!loading && "Signup"}
              {loading && <TailSpin width="24" />}
            </button>
          </form>
        </div>
        {error.length > 0 && <Error error={error} />}
      </div>
      {success.length > 0 && (
        <div className="w-50 mx-auto shadow text-center">
          <div className="alert bg-dark text-light mt-3">
            <Markup content={success} />
            <div>
              Move to
              <code>
                <Link className="link mx-1" to="/login">
                  Login
                </Link>
              </code>
              Page
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
