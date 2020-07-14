import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
// import styles1 from "../../css/auth/style.module.css";
import styles from "../../css/login/style.module.css";
import { Form, Button } from "react-bootstrap";
import Alert from "../layout/Alert";

const Login = ({ login, auth: { isAuthenticated, loading } }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated && !loading) {
    return <Redirect to='/portal/posts' />;
  }

  return (
    <Fragment>
      <section className={styles.section}>
        <Alert />
        {/* <div className={styles.heading}>Login</div> */}
        <Form onSubmit={(e) => onSubmit(e)} className={styles.box}>
          <h1>Login</h1>
          <Form.Group className='form-group'>
            <Form.Control
              type='email'
              className='form-control'
              placeholder='Email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <Form.Control
              type='password'
              className='form-control'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className={styles.btn_primary}
          >
            Login
          </Button>
          <div className={styles.form_text}>
            Don't have an account? <Link to='/register'>Click here</Link> to
            register
          </div>
        </Form>
      </section>

      {/* <Footer styles={styles} /> */}
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
