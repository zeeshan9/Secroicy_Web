import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Model from "./Model";
import Message from "./Message";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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

const ChildPostItem = ({ classes, post, userId }) => {
  return (
    <Card className={classes.card}>
      <CardMedia
        image={post.imageUrl}
        title='ProfileImage'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          color='primary'
          component={Link}
          to={"#"}
        >
          {post.mobile}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Technology: {post.technology}
          <br></br>
          User: {post.name}
          <br></br>
          Post Created: {post.time}
        </Typography>
        <Typography variant='body1'>
          {post.description}<br></br>
          </Typography>
        {userId === post.userId ? (
          <Model id={post.id} />
        ) : (
          <Message
            id={post.id}
            mobile={post.mobile}
            userId={post.userId}
            description={post.description}
          />
        )}
        {/* <Badge variant='secondary' onClick={(post) => postHandler}>
          edit
        </Badge> */}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ChildPostItem);
