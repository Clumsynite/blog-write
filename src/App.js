import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import BlogPost from "./components/BlogPost";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import EditComment from "./components/EditComment";
import Footer from "./components/Footer";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./routes/UnauthenticatedRoute";
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
        <Navbar
          authenticated={authenticated}
          setAuth={setauthenticated}
          user={user}
          clearUser={() => setuser({})}
          server={server}
        />
        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <UnauthenticatedRoute
              exact
              path="/login"
              component={Login}
              appProps={{ setAuth: setauthenticated, setUser: setuser }}
            />
            <UnauthenticatedRoute exact path="/signup" component={Signup} />
            <AuthenticatedRoute exact path="/profile" component={Profile} />
            <AuthenticatedRoute
              exact
              path="/blog/:id/view"
              component={BlogPost}
            />
            <AuthenticatedRoute exact path="/blog/new" component={AddPost} />
            <AuthenticatedRoute
              exact
              path="/blog/:id/edit"
              component={EditPost}
            />
            <AuthenticatedRoute
              exact
              path="/comment/:id/edit"
              component={EditComment}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
      <div style={{ marginTop: 80 }}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
