import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLoading, Oval } from "@agney/react-loading";
import { viewBlog } from "../scripts/api-calls";
import PostCard from "../templates/PostCard";
import CommentCard from "../templates/CommentCard";
import Error from "../templates/Error";

const BlogPost = () => {
  const { id } = useParams();
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
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await viewBlog(id, token);
        if (data.error) {
          setloading(false);
          seterror(
            `Blog Post not found. There's a Problem fetching Post: ${id}`
          );
          return;
        }
        setPost(data.blog);
        setComments(data.comment.reverse());
        setloading(false);
      } catch (error) {
        console.error(error);
        setloading(false);
      }
    };
    fetchPost();
  }, [id, token]);

  const deletePost = () => {};

  return (
    <div>
      {loading && (
        <div className="text-center my-5" {...containerProps}>
          {indicatorEl}
        </div>
      )}
      {post.title && !loading && (
        <div>
          <PostCard post={post} />
          <div className="mt-n5 d-flex align-items-center justify-content-between rounded shadow">
            <button className="btn" title="Delete Post" onClick={deletePost}>
              <i className="material-icons">delete</i>
            </button>
            <Link
              to={`/blog/${post._id}/edit`}
              className="btn"
              title="Edit Post"
            >
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
          return <CommentCard comment={comment} key={index} />;
        })}
    </div>
  );
};

export default BlogPost;
