import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import MuiLink from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { uploadProfilePicture } from "../../../actions/auth";
import { Nav } from "react-bootstrap";

const ProfilePicture = ({ uploadProfilePicture }) => {
  const [formData, setFormData] = useState({
    file: "",
  });

  const { file } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    uploadProfilePicture(file);
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
      {/* <MuiLink
        component={Link}
        to={"/portal/posts/addpost"}
        color='primary'
        type='button'
        variant='h6'
      >
        Add new Post
      </MuiLink> */}
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
