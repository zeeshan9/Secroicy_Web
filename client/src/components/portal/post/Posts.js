import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Row, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "../../../css/portal/posts/style.module.css";
import Alert from "../../layout/Alert";
import PostItem from "./PostItem";
import { getallPost, searchPost } from "../../../actions/posts";
// import { loadUser } from "../../../actions/auth";
import { loadUserProfile } from "../../../actions/auth";

const Posts = ({ getallPost, loadUserProfile, searchPost, posts }) => {
  useEffect(() => {
    loadUserProfile();
    getallPost();
  }, [loadUserProfile, getallPost]);

  const [formData, setFormData] = useState({
    description: "",
  });

  const { description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (description === "") {
      getallPost();
    } else {
      searchPost(description);
    }
  };
  return (
    <Fragment>
      <section className={styles.section}>
        <div
        // className={`${styles.content} ${
        //   !displaySideNav ? styles.side_nav_hidden : ""
        // }`}
        >
          <Alert />
          <div className={styles.heading} style={{ color: "blue" }}>
            <i className='fas fa-user' style={{ color: "blue" }}></i> Lost Phone
            Portal
          </div>
          <div className={styles.sub_heading}>
            Seach and post your lost phone and contact the finder to get your
            lost mobile
          </div>

          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Form.Control
                type='text'
                name='description'
                value={description}
                placeholder='Search IMEI number'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Button type='submit' hidden />
            </Form.Group>
          </Form>
          <Col>
            <PostItem posts={posts} />
          </Col>
        </div>
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  getallPost: PropTypes.func.isRequired,
  searchPost: PropTypes.func.isRequired,
  loadUserProfile: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, {
  getallPost,
  searchPost,
  loadUserProfile,
})(Posts);
