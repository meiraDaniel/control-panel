import React from 'react'
import './Post.scss'
const Posts = ({post,firstname,i}) => {
 
    return (
        <div key={i} className='post--center-message'>
                <h3>{post.title}</h3>
                <p>{post.message}</p>
             <p> Likes: {post.likes}</p>
                </div>
    )
}


export default Posts
