import { Link } from "react-router-dom";
import { Markup } from "interweave";
import {
  getRelativeTime,
  getContentPreview,
  getFullname,
} from "../scripts/helper";
import "../styles/BlogCard.css";

const Card = (props) => {
  const { author, title, content, added, _id, draft } = props.blog;
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
        <button className="btn btn-info w-50" title="Edit Post">
          <Link to={`/blog/${_id}/edit`} className="link-white">
            Edit
          </Link>
        </button>
        <button className="btn btn-danger w-50" title="Delete Post">
          <Link to={`/blog/${_id}/remove`} className="link-white">
            Remove
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
