import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import { useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button } from "@material-ui/core";

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState("");
  return (
    <div className="mb-5 ">
      <ValidatorForm
        className="m-3  mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <div className="d-flex flex-column">
          <TextValidator
            name="text"
            multiline
            fullWidth
            rows={2}
            variant="outlined"
            label="Leave a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comment on this post"
          ></TextValidator>

          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "rgb(0,120,200)",
              color: "white",
            }}
            className="my-1"
            value="Submit"
          >
            Comment
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
