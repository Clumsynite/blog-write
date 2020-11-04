import { Link } from "react-router-dom";
import { Markup } from "interweave";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
        props.refresh("blogs");
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
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
    <div className="shadow mb-4 rounded">
      <div className="card text-white bg-light">
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
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <button className="btn" title="Delete Post" onClick={deletePost}>
          <i className="material-icons">delete</i>
        </button>
        <Link to={`/blog/${_id}/edit`} className="btn" title="Edit Post">
          <i className="material-icons">edit</i>
        </Link>
      </div>
    </div>
  );
};

export default Card;
