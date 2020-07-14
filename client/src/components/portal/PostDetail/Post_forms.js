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
  auth: { loading, user, isAuthenticated },
  history,
}) => {
  const [formData, setFormData] = useState({
    userId: user !== null ? user.id : "",
    mobile: "",
    technology: "",
    description: "",
    imei: "",
  });

  const { userId, mobile, technology, imei, description } = formData;

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
      createNewPost(formData);
    }
  };
  return (
    <Fragment>
      <section className={styles.section}>
        <div
        //   className={`${styles.content} ${
        //     !displaySideNav ? styles.side_nav_hidden : ''
        //   }`}
        >
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
                This can be your own company and also a company that you work
                for
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
                Your position at that company
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
                The location where the company is located
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
                The location where the company is located
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
