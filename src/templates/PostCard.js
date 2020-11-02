import { Markup } from "interweave";
import { getRelativeTime, getFullname } from "../scripts/helper";

const PostCard = (props) => {
  const { post } = props;
  return (
    <div className="card shadow rounded mb-5">
      <div className="card-body">
        <h1 className="card-title text-center">{post.title}</h1>
        <div className="card-subtitle my-3 text-muted d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <i className="material-icons mr-1">account_circle</i>
            {getFullname(post.author)}
            <strong>
              <span className="badge badge-pill badge-dark mx-1">AKA</span>
            </strong>
            {post.author.username}
          </div>
          <div className="d-flex align-items-center">
            <i className="material-icons mr-1">access_time</i>
            {getRelativeTime(post.added)}
          </div>
        </div>
        <div className="card-text">
          <Markup content={post.content} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
