import React from "react";
import "./Post.scss";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  Snackbar,
} from "@material-ui/core";
const Posts = ({ post, firstname, i }) => {
  return (
    <Grid container style={{background:'blue',width:'100%', height:"30%"}}>
      {" "}
      <Grid  item style={{background:'green'}}>
        <Grid item style={{background:'pink'}}>
          <h3>{post.title}</h3>
        </Grid>
        <Grid item style={{background:'black'}}>
          <p>{post.message}</p>
        </Grid>
      </Grid>
      <Grid item style={{background:'blue'}}>
        <p> Likes: {post.likes}</p>
      </Grid>
    </Grid>
  );
};

export default Posts;
