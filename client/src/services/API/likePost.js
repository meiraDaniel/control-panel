import axios from 'axios'



export default  async function likePost (postId,token){
    const response = await axios.put("/wall/like", { 
        headers: { 'Authorization': token },
       data:{postId}
        
    })

    return  response
}