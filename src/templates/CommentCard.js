import { Markup } from "interweave";
import { getRelativeTime, getFullname } from "../scripts/helper";
import "../styles/BlogCard.css";

const Card = (props) => {
  const { author, title, content, added } = props.comment;
  return (
    <div className="card mb-4">
      <div className="card-body bg-light text-dark">
        <h4 className="card-title">{title}</h4>
        <div className="card-text ">
          <Markup content={content} />
        </div>
      </div>
      <div className="card-footer text-white bg-secondary text-right d-flex justify-content-between flex-wrap">
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
  );
};

export default Card;
