import axios from 'axios'



export default  async function likePost (postId,token){
    const response = await axios.put("/wall/dislike", { 
        headers: { 'Authorization': token },
       data:{postId}
        
    })

    return  response
}