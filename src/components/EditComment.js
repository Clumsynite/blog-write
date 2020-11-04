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
            history.goBack();
          }, 5000);
        } else if (data.author !== user._id) {
          seterror(
            "This is not your Comment. You can't edit someone else's comment."
          );
          setTimeout(() => {
            history.goBack();
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

  const handleClick = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      seterror("Comment Title can't be empty");
    } else if (content.trim().length === 0) {
      seterror("Comment content can't be empty");
    } else {
      setposting(true);
      submitPost();
    }
  };

  const submitPost = async () => {
    try {
      const data = await updateComment(id, { title, content }, token);
      setposting(false);
      if (!data.error) {
        history.push("/profile");
      }
    } catch (error) {
      console.log(error);
      setposting(false);
    }
  };

  return (
    <div className="EditComment">
      {loading && (
        <div className="text-center my-5" {...containerProps}>
          {indicatorEl}
        </div>
      )}
      {error.length > 0 && <Error error={error} />}
      {title.length > 1 && !loading && (
        <div>
          <div className="Preview">
            <CommentCard
              comment={{ title, content, author: user, added: new Date() }}
            />
          </div>
          <div className="Editor">
            <div className="mb-4 shadow">
              <input
                type="text"
                placeholder="Enter Post Title"
                maxLength="40"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                value={title}
                className="form-control"
              />
              <TinyMCE
                height={250}
                placeholder={"Enter content for your post here"}
                handleChange={(content) => {
                  setcontent(content);
                }}
                value={content}
              />
              <button
                type="submit"
                className={`btn ${
                  posting ? "btn-info" : "btn-outline-info"
                } btn-block`}
                onClick={handleClick}
                title="Post"
                disabled={posting}
              >
                {!posting && "Submit"}
                {posting && <TailSpin width="20" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditComment;
