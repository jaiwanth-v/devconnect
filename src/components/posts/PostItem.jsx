import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { Button } from "@material-ui/core";

const PostItem = ({
  addLike,
  removeLike,
  auth,
  showActions,
  deletePost,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div className="post shadow-sm rounded bg-white mb-4 my-1">
      <div style={{ height: "140px" }}>
        <img
          className="round-img ml-1"
          style={{ height: "100px", width: "100px" }}
          src={avatar}
          alt=""
        />
        <Link to={`/profile/${user}`}>
          <h4> {name} </h4>
        </Link>
      </div>
      <div>
        <div className="ml-md-3">
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted <Moment fromNow>{date}</Moment>{" "}
          </p>
        </div>
        {showActions && (
          <div className="d-flex">
            <Button
              onClick={(e) => addLike(_id)}
              type="Button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>
              {likes.length > 0 && <span className="ml-1">{likes.length}</span>}
            </Button>
            <Button
              onClick={(e) => removeLike(_id)}
              type="Button"
              className="btn btn-light mr-2"
            >
              <i className="fas fa-thumbs-down"></i>
            </Button>
            <Link to={`/posts/${_id}`}>
              <Button className="btn btn-light">
                Discussion{" "}
                {comments.length > 0 && <span>({comments.length})</span>}
              </Button>
            </Link>
            {!auth.loading && user === auth.user._id && (
              <Button
                onClick={() => deletePost(_id)}
                type="Button"
                className="btn "
              >
                <i className="fas fa-trash"></i>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
