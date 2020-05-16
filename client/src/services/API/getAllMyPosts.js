import axios from 'axios'



export default  async function getAllMyPosts (account_id,token){
    
    const response = await axios.post("/wall/myposts", { 
        headers: { 'Authorization': token },
       data:{account_id}
        
    })

    return  response
}