import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <div className="shadow p-4 w-75 mx-auto" style={{ fontSize: 18 }}>
        <h3 className="text-center">Landing Page</h3>
        <div className="mt-3">
          If you see a loading animation instead of a green dot next to
          <code> Clumsyknight's Blog</code>, that means your network isn't
          connected to the server yet. This happens because Heroku puts the API
          on sleep if there's no activity in 1 hour.
        </div>
        <div className="mt-2">
          This site is meant for reading Blog posts and commenting on those
          posts. If you want to post yourself you'll have to go to
          <code>
            <a
              href="https://clumsynite.github.io/blog-write"
              className="link mx-1"
              title="Site meant for posting yourself"
            >
              Blog Write
            </a>
          </code>
          .
        </div>
        <div className="mt-2">
          <Link className="link mr-2" to="/login">
            Login
          </Link>
          if you haven't logged in yet. You need to have an account if you want
          to read posts.
        </div>
        <div className="mt-2">
          <Link className="link mr-2" to="/signup">
            Signup
          </Link>
          if you are new here. Be sure to remember you password, you can't reset
          it and there's nothing we can do if you forget it.
        </div>
      </div>
    </div>
  );
};

export default Home;
