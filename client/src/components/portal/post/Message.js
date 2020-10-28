import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postMessage } from "../../../actions/posts";

const Message = ({
  postMessage,
  auth: { user },
  id,
  mobile,
  description,
  userId,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    loginId: user !== null ? user.id : "",
    message: "",
    mobile,
    description,
    userId,
    time: new Date(),
    name: user !== null ? user.name : ""
  });

  const { message, loginId } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (message === "") {
      alert("empty");
    } else {
      if (user.id !== "") {
        setFormData({ loginId: user.id });
        console.log("user " + formData);
        postMessage(formData, id); //id=post.id
      } else {
        alert("emtpy");
      }
    }
  };

  return (
    <Fragment>
      <i className='fas fa-envelope' onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Form.Control
                type='text'
                className='form-control'
                name='message'
                value={message}
                onChange={(e) => onChange(e)}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              className='form-control'
              onClick={handleClose}
            >
              Send
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

Message.propTypes = {
  postMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { postMessage })(Message);
