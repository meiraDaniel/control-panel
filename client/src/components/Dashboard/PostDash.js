import React,{useState} from "react";
import "./style/post.scss";
import likes from '../../images/like.svg'
import likePost from '../../services/API/likePost'
import dislikePost from '../../services/API/dislikePost'
import { useEffect } from "react";

export default function PostDash({ post, i,token }) {

  const [ flag,setFlag] =useState(false)
  const [ url,setUrl] =useState('')




const handleLike=()=>{
if(!flag){
  likePost(post.postId,token).then(res=> console.log(res)).catch(err=>console.log(err))
  setFlag(!flag)
}
else{
  dislikePost(post.postId,token).then(res=> console.log(res)).catch(err=>console.log(err))
  setFlag(!flag)

}
}

  return (
    <div key={i} className="dashboard--center-postDash">
      <div className="postDash--left">
       <img src={post.avatar_name} alt={post.firstname} />
 
     </div>
      <div className='postDash--right'>
      <h2 id='post--h2'>{post.firstname}</h2>

     <div className="postDashPImage">
        <p id='post--rigth-p-message'>{post.message}</p>
        <img className={flag?'postDash--dashboard-likes':'postDash--dashbord-notLike'} onClick={handleLike} src={likes} alt="heart"/> 
        </div>
      </div>
    </div>
  );
}
