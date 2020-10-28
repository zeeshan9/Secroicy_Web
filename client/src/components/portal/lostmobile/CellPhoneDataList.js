import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
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

 const CellPhoneDataList = ({classes, location}) => {
    return (
        <Card className={classes.card}>
      <CardMedia
        image={location.imageUrl}
        title='ProfileImage'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          color='primary'
          component={Link}
          to={"link will be here"}
        >
          {location.mobile}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
            Latitude: {location.latitude}
        </Typography>
        <Typography variant='body1'>Longitude: {location.longitude}</Typography>
        <Typography variant='body1'>Time: {location.time}</Typography>
        
      </CardContent>
    </Card>

    )
}
export default withStyles(styles)(CellPhoneDataList);