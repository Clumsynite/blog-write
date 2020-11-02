import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Particles from "./components/Particles";
import { ping, userLogout } from "./scripts/api-calls";

const App = () => {
  const [user, setuser] = useState(localStorage.getItem("user") || {});
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [server, setserver] = useState(false);
  useEffect(() => {
    const getStatus = async () => {
      if (!server) {
        const status = await ping();
        if (!status.error) {
          setserver(true);
        } else {
          console.error("Unknown error. Reconnecting in 10sec");
          setserver(false);
          setTimeout(getStatus, 10000);
        }
      }
    };
    const logoutWhenNoCookie = async () => {
      if (document.cookie === "") {
        try {
          const data = await userLogout();
          if (data.message === "Logged out successfully") {
            localStorage.clear();
            setuser({});
            setauthenticated(false);
          } else {
            console.error(data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    setTimeout(logoutWhenNoCookie, 2000);
    getStatus();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Particles />
      <Router>
        <Navbar server={server} />
      </Router>
    </div>
  );
};

export default App;
