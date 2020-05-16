import React from 'react'

const Posts = ({post,firstname,i}) => {
    return (
        <div key={i}>
              <h3>{firstname}</h3>
                <h3>{post.title}</h3>
                <p>{post.message}</p>
    <p>{post.likes}</p>
                </div>
    )
}


export default Posts
