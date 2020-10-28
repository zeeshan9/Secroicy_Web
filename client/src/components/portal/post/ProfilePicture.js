import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { uploadProfilePicture } from "../../../actions/auth";

const ProfilePicture = ({ uploadProfilePicture, history }) => {
  const [formData, setFormData] = useState({
    file: "",
  });

  const { file } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    uploadProfilePicture(file, history);
  };

  return (
    <Fragment>
      <Form onSubmit={(e) => onSubmit(e)} style={{ padding: "20px" }}>
        <Form.Group style={{ marginLeft: "55px" }}>
          <Form.Control type='file' onChange={(e) => onChange(e)} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Upload profile picture
        </Button>
      </Form>
      <Link type='button' to='/portal/posts/addpost'>
        ADD NEW POST
      </Link>

    </Fragment>
  );
};
ProfilePicture.propTypes = {
  uploadProfilePicture: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { uploadProfilePicture })(
  ProfilePicture
);
