import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Markup } from "interweave";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TailSpin } from "@agney/react-loading";
import {
  getRelativeTime,
  getContentPreview,
  getFullname,
} from "../scripts/helper";
import { removePost } from "../scripts/api-calls";
import "../styles/BlogCard.css";

const Card = (props) => {
  const token = localStorage.getItem("token");
  const { author, title, content, added, _id, draft } = props.blog;
  const MySwal = withReactContent(Swal);
  const [removing, setremoving] = useState(false);
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
        remove();
      }
    });
  };

  const remove = async () => {
    try {
      const data = await removePost(_id, token);
      if (data.message) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
    <div className="card text-white bg-primary shadow mb-4 bg-white rounded">
      <Link to={`/blog/${_id}/view`} className="link mx-0">
        <div className="card-header text-center bg-dark">{title}</div>
        <div className="card-body bg-light text-dark">
          <div className="card-text ">
            <Markup content={getContentPreview(content)} />
          </div>
        </div>
      </Link>
      <div
        className={`card-footer text-white ${
          draft ? "bg-danger" : "bg-primary"
        } text-right d-flex justify-content-between flex-wrap`}
        title={
          draft
            ? "This post hasn't been published yet"
            : "This post is already Published"
        }
      >
        <div className="d-flex align-items-center">
          <i className="material-icons mr-1">account_circle</i>
          {getFullname(author)}
          <strong>
            <span className="badge badge-pill badge-dark mx-1"> AKA </span>
          </strong>
          {author.username}
        </div>
        <div className="d-flex align-items-center">
          <i className="material-icons mr-1">access_time</i>
          {getRelativeTime(added)}
        </div>
      </div>
      <div className="mt-1 d-flex align-items-center bg-success">
        <Link to={`/blog/${_id}/edit`} className="link-white btn btn-info w-50">
          Edit
        </Link>

        <button className="btn btn-danger w-50" onClick={deletePost}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Card;
