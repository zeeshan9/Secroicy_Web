import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { Badge, Modal, Button } from "react-bootstrap";
// import Model from "./Model";
import Message from "./Message";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import image from "../../../img/gigpic.png";
const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectfit: "cover",
  },
};

const NotificationItem = ({ classes, messages }) => {
  return (
    <Card className={classes.card}>
      {/* <CardMedia
        image={imageUrl !== null ? imageUrl : Image}
        title='ProfileImage'
        className={classes.image}
      /> */}
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          color='primary'
          component={Link}
          to={"link will be here"}
        >
          {messages.mobile}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Technology: {messages.description}
        </Typography>
        <Typography variant='body1'>Message: {messages.message}</Typography>
        <Message
          id={messages.postId}
          mobile={messages.mobile}
          userId={messages.loginId}
          description={messages.description}
        />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(NotificationItem);
