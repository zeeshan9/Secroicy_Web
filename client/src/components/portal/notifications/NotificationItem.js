import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Message from "./Message";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
          <br></br>
          User: {messages.name}
          <br></br>
          Time: {messages.time}
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
