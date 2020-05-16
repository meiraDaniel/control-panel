import React,{useState,useEffect} from "react";
import placeHolder from "../../images/Butterfly.svg";
import "./style/post.scss";

export default function Posts({ post, i }) {

  

  return (
    <div key={i} className="dashboard--center-post">
      <div className="post--left">
        <img src={placeHolder} alt={post.firstname} />
      </div>
      <div className='post--right'>
        <h2>{post.firstname}</h2>
        <p>{post.message}</p>{" "}
      </div>
    </div>
  );
}
