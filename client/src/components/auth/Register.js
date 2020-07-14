import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import styles from "../../css/auth/style.module.css";
import { Form, Button } from "react-bootstrap";
import Alert from "../layout/Alert";
// import styles from "../../css/login/style.module.css";

// import Footer from "../layout/Footer";

const Register = ({
  setAlert,
  register,
  auth: { isAuthenticated, loading },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilelost: "",
    contactinfo: "",
    address: "",
    description: "",
    password: "",
    password1: "",
  });

  const {
    name,
    email,
    password,
    password1,
    mobilelost,
    contactinfo,
    address,
    description,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password1) {
      setAlert("Passwords do not match", "danger");
    } else {
      register(
        name,
        email,
        password,
        mobilelost,
        contactinfo,
        address,
        description
      );
    }
  };

  if (isAuthenticated && !loading) {
    return <Redirect to='/portal/posts' />;
  }

  return (
    <Fragment>
      <section className={styles.section}>
        <Alert />

        <Form className={styles.box} onSubmit={(e) => onSubmit(e)}>
          {/* <h1 className={styles.heading}>Register</h1> */}
          <p className={styles.heading}>Register</p>
          <Form.Group>
            <Form.Control
              type='text'
              className='form-control'
              placeholder='Name'
              name='name'
              value={name}
              required
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='email'
              className='form-control'
              placeholder='Email'
              name='email'
              required
              value={email}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              className='form-control'
              placeholder='Mobile Lost'
              name='mobilelost'
              required
              value={mobilelost}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              className='form-control'
              placeholder='Contact Infomation'
              name='contactinfo'
              required
              value={contactinfo}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              className='form-control'
              placeholder='address'
              name='address'
              required
              value={address}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              className='form-control'
              placeholder='description'
              name='description'
              required
              value={description}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='password'
              className='form-control'
              placeholder='Password'
              name='password'
              required
              value={password}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              name='password1'
              required
              value={password1}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className={styles.btn_primary}
          >
            Register
          </Button>
          <div className={styles.form_text}>
            Already have an account? <Link to='/login'>Click here</Link> to
            login
          </div>
        </Form>
      </section>

      {/* <Footer styles={styles} /> */}
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
