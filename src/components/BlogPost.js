import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useLoading, Oval } from "@agney/react-loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PostCard from "../templates/PostCard";
import CommentCard from "../templates/CommentCard";
import Error from "../templates/Error";
import { viewBlog, removePost, removeComment } from "../scripts/api-calls";

const BlogPost = () => {
  const { id } = useParams();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [loading, setloading] = useState(true);
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval width="100" />,
    loaderProps: {
      style: { color: "#007BFF" },
    },
  });
  const [error, seterror] = useState("");
  useEffect(() => {
    return setTimeout(() => {
      seterror("");
    }, 5000);
  }, [error, seterror]);

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const fetchPost = useCallback(async () => {
    try {
      const data = await viewBlog(id, token);
      if (data.error || data.blog === null) {
        setloading(false);
        seterror(`Blog Post not found. There's a Problem fetching Post: ${id}`);
        return;
      }
      setPost(data.blog);
      setComments(data.comment.reverse());
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const MySwal = withReactContent(Swal);
  const deletePost = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeBlogPost();
      }
    });
  };

  const removeBlogPost = async () => {
    try {
      const data = await removePost(id, token);
      if (data.message) {
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        history.push("/profile");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error(error);
    }
  };

  const deleteComment = (commentId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeSelectedComment(commentId);
      }
    });
  };

  const removeSelectedComment = async (commentId) => {
    try {
      const data = await removeComment(commentId, token);
      if (data.message) {
        fetchPost();
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error(error);
    }
  };

  return (
    <div>
      {loading && (
        <div className="text-center my-5" {...containerProps}>
          {indicatorEl}
        </div>
      )}
      {post.title && !loading && (
        <div className="mb-4">
          <PostCard post={post} />
          <div className="mt-n5 d-flex align-items-center justify-content-between rounded shadow">
            <button className="btn" title="Delete Post" onClick={deletePost}>
              <i className="material-icons">delete</i>
            </button>
            <Link to={`/blog/${id}/edit`} className="btn" title="Edit Post">
              <i className="material-icons">edit</i>
            </Link>
          </div>
        </div>
      )}
      {error.length > 0 > 0 && (
        <div className="w-75 mx-auto">
          <Error error={error} />
        </div>
      )}
      {comments.length > 0 &&
        comments.map((comment, index) => {
          return (
            <div className="shadow mb-4" key={index}>
              <CommentCard comment={comment} />
              {comment.author._id === post.author._id && (
                <div
                  className="d-flex align-items-center justify-content-between mt-n4"
                  style={{ backgroundColor: "transparent" }}
                >
                  <button
                    className="btn"
                    title="Delete Comment"
                    onClick={() => {
                      deleteComment(comment._id);
                    }}
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
              )}
            </div>
          );
        })}
    </div>
  );
};

export default BlogPost;
