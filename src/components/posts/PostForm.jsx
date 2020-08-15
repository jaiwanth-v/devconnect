import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Button } from "@material-ui/core";

const PostForm = ({ addPost, user: { name, avatar } }) => {
  const [text, setText] = useState("");
  return (
    <div className="post shadow-sm rounded mb-5 ">
      <div>
        <img
          style={{ height: "100px", width: "100px" }}
          className="round-img mb-4"
          src={avatar}
          alt="avatar"
        />
        <h4> {name} </h4>
      </div>

      <div className="d-flex flex-column">
        <ValidatorForm
          className="m-3 mr-md-3 mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText("");
          }}
        >
          <TextValidator
            name="text"
            multiline
            rows={4}
            fullWidth
            validators={["required"]}
            errorMessages={["The post cannot be empty"]}
            variant="outlined"
            label="Create a post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Create a post"
          ></TextValidator>
          <div className="d-flex flex-column">
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
              Post
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addPost })(PostForm);
