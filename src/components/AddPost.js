import React, { useState, useEffect } from "react";
import TinyMCE from "../templates/TinyMCE";
import PostCard from "../templates/PostCard";

const AddPost = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [draft, setdraft] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="AddPost">
      <div className="Preview">
        <PostCard post={{ title, content, added: new Date(), author: user }} />
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
          <div className="d-flex justify-content-between align-content-center">
            <div className="form-check form-check-inline ml-2 bg-light">
              <label className="form-check-label">
                Save as Draft
                <input
                  className="form-check-input mx-2"
                  type="checkbox"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-outline-success">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
