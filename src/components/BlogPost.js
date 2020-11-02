import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLoading, Oval } from "@agney/react-loading";
import { viewBlog, addComment } from "../scripts/api-calls";
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
  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");
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
  }, [id, token, commentTitle, setCommentTitle]);

  const handleEditorChange = (content, editor) => {
    setCommentContent(content);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (commentTitle.trim().length === 0) {
      seterror("Comment title can't be empty");
      return;
    } else if (commentContent.trim().length === 0) {
      seterror("Comment content can't be empty.");
      return;
    } else {
      setPosting(true);
      newComment();
    }
  };

  const [posting, setPosting] = useState(false);
  const newComment = async () => {
    try {
      const data = await addComment(
        id,
        { title: commentTitle, content: commentContent },
        token
      );
      setPosting(false);
      if (!data.error) {
        setCommentTitle("");
        setCommentContent("");
      }
    } catch (error) {
      setPosting(false);
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
      {post.title && !loading && <PostCard post={post} />}
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
