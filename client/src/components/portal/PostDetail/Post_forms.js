import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import { createNewPost } from "../../../actions/posts";
import styles from "../../../css/portal/profile-forms/style.module.css";
import { setAlert } from "../../../actions/alert";

const Post_forms = ({
  createNewPost,
  auth: {  user },
  history,
}) => {
  const [formData, setFormData] = useState({
    userId: user !== null ? user.id : "",
    mobile: "",
    technology: "",
    description: "",
    imei: "",
    time: new Date(),
    name: user !== null ? user.name : ""
  });
  
  const { userId, mobile, technology, imei, description, time, name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      userId === "" ||
      mobile === "" ||
      technology === "" ||
      imei === "" ||
      description === ""
    ) {
      setAlert("Please fill all the required fields");
    } else {
      createNewPost(formData,history);
    }
  };
  return (
    <Fragment>
      <section className={styles.section}>
        <div>
          <Alert />
          <div className={styles.heading}>
            <i className='fab fa-black-tie'></i> Add Posts
          </div>
          <div className={styles.sub_heading}>
            Fill in the following information to add an experience
          </div>

          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Form.Control
                type='text'
                className='form-control'
                placeholder='mobile'
                name='mobile'
                value={mobile}
                onChange={(e) => onChange(e)}
              />
              <Form.Text className='text-muted'>
                  Enter the lost mobile name
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type='text'
                className='form-control'
                placeholder='technology'
                name='technology'
                value={technology}
                onChange={(e) => onChange(e)}
              />
              <Form.Text className='text-muted'>
                Enter the technology of your lost mobile
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type='text'
                className='form-control'
                placeholder='imei'
                name='imei'
                value={imei}
                onChange={(e) => onChange(e)}
              />
              <Form.Text className='text-muted'>
                Enter your mobile unique imei number
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type='text'
                className='form-control'
                placeholder='description'
                name='description'
                value={description}
                onChange={(e) => onChange(e)}
              />
              <Form.Text className='text-muted'>
                Enter the discription that how and where ou lost your mobile
              </Form.Text>
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              className={`${styles.btn_primary} my-2`}
            >
              Submit
            </Button>
            <Button
              variant='danger'
              className='my-2'
              onClick={() => history.push("/portal/posts")}
            >
              Cancel
            </Button>
          </Form>
        </div>
      </section>
    </Fragment>
  );
};

Post_forms.propTypes = {
  createNewPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { createNewPost })(Post_forms);
