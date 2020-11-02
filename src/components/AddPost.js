import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Markup } from "interweave";
import PostCard from "../templates/PostCard";
const AddPost = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
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
          <Editor
            apiKey="iegn84mumhivsy1it2lvc8qjfxkaav0snoxsx4u66dxlnz3g"
            initialValue=""
            init={{
              height: 250,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              placeholder: "Enter content for your post here",
            }}
            onEditorChange={(content) => {
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
