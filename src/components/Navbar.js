import { NavLink, useHistory } from "react-router-dom";
import { userLogout } from "../scripts/api-calls";
import { useLoading, Puff } from "@agney/react-loading";

const Navbar = (props) => {
  const history = useHistory();
  const { containerProps, indicatorEl } = useLoading({
    loading: !props.server,
    indicator: <Puff width="28" />,
    loaderProps: {
      style: { color: "#00ffff" },
    },
  });

  const handleLogout = async () => {
    try {
      const data = await userLogout();
      if (data.message === "Logged out successfully") {
        localStorage.clear();
        props.clearUser();
        props.setAuth(false);
        document.cookie = "login=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        history.push("/login");
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
        <div className="d-flex justify-content-center align-items-center">
          <NavLink className="navbar-brand mr-2" to="/" replace>
            Clumsyknight's Blog
          </NavLink>
          {!props.server && (
            <div
              style={{
                color: "#00ff80",
                cursor: "pointer",
              }}
              title="Connecting"
              {...containerProps}
            >
              {indicatorEl}
            </div>
          )}
          {props.server && (
            <div title="Connected">
              <svg height="20" width="20" cursor="pointer">
                <circle cx="15" cy="10" r="5" fill="#00ffbf" />
              </svg>
            </div>
          )}
        </div>
        <button
          className="navbar-toggler ml-auto custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          {!props.authenticated && (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {props.authenticated && (
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    title={`${props.user.firstname} ${props.user.lastname}`}
                    to="/profile"
                  >
                    My Profile
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <div
                    className="nav-link"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
