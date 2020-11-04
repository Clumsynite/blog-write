import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useLoading, Oval, TailSpin } from "@agney/react-loading";
import TinyMCE from "../templates/TinyMCE";
import CommentCard from "../templates/CommentCard";
import Error from "../templates/Error";
import { viewComment, updateComment } from "../scripts/api-calls";

const EditComment = () => {
  const history = useHistory();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [loading, setloading] = useState(true);
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval width="100" />,
    loaderProps: {
      style: { color: "#007BFF" },
    },
  });
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [error, seterror] = useState("");
  useEffect(() => {
    return setTimeout(() => {
      seterror("");
    }, 5000);
  }, [error, seterror]);
  const [posting, setposting] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await viewComment(id, token);
        setloading(false);
        if (data.error) {
          seterror(
            `Comment not found. There's a Problem fetching Comment: ${id}`
          );
          setTimeout(() => {
            history.push("/profile");
          }, 5000);
        } else if (data.author !== user._id) {
          seterror(
            "This is not your Comment. You can't edit someone else's comment."
          );
          setTimeout(() => {
            history.push("/profile");
          }, 5000);
        } else {
          setcontent(data.content);
          settitle(data.title);
        }
      } catch (error) {
        console.error(error);
        setloading(false);
      }
    };
    fetchComment();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="EditComment">
      {loading && (
        <div className="text-center my-5" {...containerProps}>
          {indicatorEl}
        </div>
      )}
      {error.length > 0 && <Error error={error} />}
      <h1>Edit Comment</h1>
    </div>
  );
};

export default EditComment;
