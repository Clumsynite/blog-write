import React, { useState, useEffect } from "react";
import TinyMCE from "../templates/TinyMCE";
import PostCard from "../templates/PostCard";

const AddPost = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
    return time;
  }, [time, setTime]);

  const [draft, setdraft] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="AddPost">
      <div className="Preview">
        <PostCard post={{ title, content, added: time, author: user }} />
      </div>
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
        </div>
      </div>
    </div>
  );
};

export default AddPost;
