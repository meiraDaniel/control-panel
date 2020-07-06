import React from "react";
import { Grid } from "@material-ui/core";

const Posts = ({ post, i }) => {
  return (
    <Grid
      key={i}
      container
      style={{ margin: "1%", height: "90%", overflow: "hidden" }}
    >
      <Grid item xs={12} style={{ height: "20%", textAlign: "center" }}>
        <h3 className="post-h3">{post.title}</h3>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          height: "60%",
          padding: "1%",
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
         textAlign: "center" 
        }}
      >
        <p className="post-p">{post.message}</p>
      </Grid>
      <Grid item xs={12} style={{ height: "20%" , textAlign: "center" }}>
        <p className="post-p"> Likes: {post.likes}</p>
      </Grid>
    </Grid>
  );
};

export default Posts;
