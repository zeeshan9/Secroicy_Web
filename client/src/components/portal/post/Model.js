import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadPostImage } from "../../../actions/auth";

const Model = ({ id, uploadPostImage }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    file: "",
  });

  const { file } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    uploadPostImage(file, id);
  };

  return (
    <Fragment>
      <Button variant='primary' onClick={handleShow}>
        upload image
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Form.Control type='file' onChange={(e) => onChange(e)} />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={handleClose}>
              Upload Image
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
Model.propTypes = {
  uploadPostImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { uploadPostImage })(Model);
