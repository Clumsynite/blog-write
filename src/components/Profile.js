import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLoading, Bars } from "@agney/react-loading";
import BlogCard from "../templates/BlogCard";
import CommentCard from "../templates/CommentCard";
import { myProfile } from "../scripts/api-calls";
import { getFullname, getRelativeTime } from "../scripts/helper";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [loading, setloading] = useState(true);
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Bars width="100" />,
    loaderProps: {
      style: { color: "#17A2B8" },
    },
  });
  const [profile, setprofile] = useState([]);
  const [render, setRender] = useState();
  const [user, setUser] = useState({});

  const getProfile = useCallback(async () => {
    try {
      const data = await myProfile(token);
      setprofile({
        user: data.user,
        blogs: data.blogs.reverse(),
        comments: data.comments.reverse(),
      });
      setUser(data.user);
      setRender("blogs");
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  }, [token]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const deleteComment = () => {};

  return (
    <div className="Profile">
      {loading && (
        <div className="text-center" {...containerProps}>
          {indicatorEl}
        </div>
      )}
      {profile.user && (
        <div
          className="card mb-4 mx-auto shadow rounded"
          style={{ width: "19rem" }}
        >
          <div className="card-header bg-dark text-white">
            Joined {getRelativeTime(user.added)}
          </div>
          <div className="card-body bg-light">
            {getFullname(user)}{" "}
            <strong>
              <span className="badge badge-pill badge-dark mx-1"> AKA </span>
            </strong>
            {user.username}
          </div>
          <div className="card-footer text-white bg-info text-right d-flex justify-content-between flex-wrap">
            <div
              className="d-flex align-items-center"
              title="Number of Posts"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setRender("blogs");
              }}
            >
              Post Count: {profile.blogs.length}
            </div>
            <div
              className="d-flex align-items-center"
              title="Number of Comments"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setRender("comments");
              }}
            >
              <i className="material-icons mr-1">comment</i>
              {profile.comments.length}
            </div>
          </div>
        </div>
      )}
      {render === "blogs" && profile.blogs.length === 0 && (
        <div className="alert alert-info mx-auto w-75">
          You haven't Posted anything yet
        </div>
      )}
      {render === "blogs" &&
        profile.blogs.length > 0 &&
        profile.blogs.map((blog, index) => {
          return <BlogCard blog={blog} key={index} refresh={getProfile} />;
        })}

      {render === "comments" && profile.comments.length === 0 && (
        <div className="alert alert-info mx-auto w-75">
          You haven't made any comments yet
        </div>
      )}
      {render === "comments" &&
        profile.comments.length > 0 &&
        profile.comments.map((comment, index) => {
          const { blog } = comment;
          return (
            <div className="shadow rounded" key={index}>
              <Link to={`/blog/${blog._id}/view`} className="link">
                <div className="card-header text-center bg-dark text-light">
                  You commented on <code>{blog.title}</code>
                </div>
                <CommentCard comment={comment} />
              </Link>
              <div className="d-flex align-items-center justify-content-between mt-n5">
                <button
                  className="btn"
                  title="Delete Comment"
                  onClick={deleteComment}
                >
                  <i className="material-icons">delete</i>
                </button>
                <Link
                  to={`/comment/${comment._id}/edit`}
                  className="btn"
                  title="Edit Comment"
                >
                  <i className="material-icons">edit</i>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Profile;
