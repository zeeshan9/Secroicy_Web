import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import styles from "../../css/landing/style.module.css";

const Landing = () => {
  return (
    <Fragment>
      <section className={styles[`container-fluid`]}>
        <div className={styles.banner}>
          <div className={styles.main_title}>Secroicy</div>
          <div className={styles.description}>
            Discover your lost phone here and post it here to deliver it to its
            orignal owner. It a community to help people to discover their lost
            mobiles.
          </div>
        </div>

        <div className={styles.services}>
          <div className={styles.heading}>Secroicy Provides</div>
          <Row className={styles.row}>
            <Col xs={12} md={5} className={styles.service}>
              <div>
                <i
                  className='fas fa-users fa-2x'
                  style={{ color: "white" }}
                ></i>
              </div>
              <strong>
                <Link to='/login' style={{ color: "white" }}>
                  Community
                </Link>
              </strong>
              <div style={{ color: "white" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                quae consectetur adipisci corporis, dolorum laudantium nostrum
                veniam voluptates quas cupiditate architecto rerum excepturi
                reiciendis quos necessitatibus magni at optio officia.
              </div>
            </Col>
            <Col xs={12} md={5} className={styles.service}>
              <div>
                <i
                  className='fab fa-think-peaks fa-2x'
                  style={{ color: "white" }}
                ></i>
              </div>
              <strong>
                <Link to='/login' style={{ color: "white" }}>
                  Lost Phone
                </Link>
              </strong>
              <div style={{ color: "white" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus consectetur magnam tempora recusandae, esse,
                doloribus dignissimos, fugit sint enim expedita nam in
                laboriosam ea exercitationem ullam voluptas quas soluta dolores!
              </div>
            </Col>
          </Row>
        </div>
        <header>
          <h1>Welcome to Secroicy</h1>
        </header>
      </section>

      {/* <Footer styles={styles} /> */}
    </Fragment>
  );
};

export default Landing;
