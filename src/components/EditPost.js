import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useLoading, Oval, TailSpin } from "@agney/react-loading";
import TinyMCE from "../templates/TinyMCE";
import PostCard from "../templates/PostCard";
import Error from "../templates/Error";
import { newPost } from "../scripts/api-calls";

const AddPost = () => {
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
  const [draft, setdraft] = useState(false);
  const [error, seterror] = useState("");
  useEffect(() => {
    return setTimeout(() => {
      seterror("");
    }, 5000);
  }, [error, seterror]);
  const [posting, setposting] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      seterror("Post Title can't be empty");
    } else if (content.trim().length === 0) {
      seterror("Post content can't be empty");
    } else {
      setposting(true);
      submitPost();
    }
  };

  const submitPost = async () => {
    try {
      const data = await newPost({ title, content, draft }, token);
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
    <div className="AddPost">
      {loading && (
        <div className="text-center my-5" {...containerProps}>
          {indicatorEl}
        </div>
      )}
      <div className="Preview">
        <PostCard post={{ title, content, added: new Date(), author: user }} />
      </div>
      {error.length > 0 && <Error error={error} />}
      <div className="Edit">
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
          <div className="d-flex justify-content-between align-content-center">
            <div className="form-check form-check-inline ml-2 bg-light">
              <label className="form-check-label">
                Save as Draft
                <input
                  className="form-check-input mx-2"
                  type="checkbox"
                  onClick={(e) => {
                    setdraft(e.target.checked);
                  }}
                />
              </label>
            </div>
            <button
              type="submit"
              className={`btn ${
                posting ? "btn-success" : "btn-outline-success"
              } w-50`}
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
    </div>
  );
};

export default AddPost;
