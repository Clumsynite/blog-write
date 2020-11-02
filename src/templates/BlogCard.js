import { Link } from "react-router-dom";
import {
  getRelativeTime,
  getContentPreview,
  getFullname,
} from "../scripts/helper";
import "../styles/BlogCard.css";

const Card = (props) => {
  const { author, title, content, added, _id } = props.blog;
  return (
    <div className="card text-white bg-primary shadow mb-4 bg-white rounded">
      <Link to={`/blog/${_id}/view`} className="link">
        <div className="card-header text-center bg-dark">{title}</div>
        <div className="card-body bg-light text-dark">
          <div className="card-text ">{getContentPreview(content)}</div>
        </div>
      </Link>
      <div className="card-footer text-white bg-primary text-right d-flex justify-content-between flex-wrap">
        <div className="d-flex align-items-center">
          <i className="material-icons mr-1">account_circle</i>{" "}
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
  );
};

export default Card;
