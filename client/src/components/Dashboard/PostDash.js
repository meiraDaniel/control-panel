import React,{useState} from "react";
import "./style/post.scss";
import likes from '../../images/like.svg'
import likePost from '../../services/API/likePost'
import dislikePost from '../../services/API/dislikePost'
import { Grid } from "@material-ui/core";
import {ThumbUp} from "@material-ui/icons"

export default function PostDash({ post, i,token }) {

  const [ flag,setFlag] =useState(false)




const handleLike=()=>{
if(!flag){
  likePost(post.postId,token)
  setFlag(!flag)
}
else{
  dislikePost(post.postId,token)
  setFlag(!flag)

}
}

  return (
    <Grid
      key={i}
      container
      style={{ margin: "1%", height: "90%", overflow: "hidden" }}
    >
      <Grid item xs={12} style={{ height: "20%", textAlign: "center" }}>
      <h3 id='post--h3'>{post.firstname}</h3>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          height: "58%",
          padding: "1%",
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >
        <p className='post--p'>{post.message}</p>
      </Grid>
      <Grid item xs={5} style={{ height: "20%" }}>
      <ThumbUp className={flag?'postDash--dashboard-likes':'postDash--dashbord-notLike'} onClick={handleLike} /> 
      </Grid>
    </Grid>

  );
}
