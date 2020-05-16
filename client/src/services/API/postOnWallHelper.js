import axios from 'axios'



export default  async function postOnWAllHelper (account_id,title,message,token){
    
    const response = await axios.post("/wall/post", { 
        headers: { 'Authorization': token },
       data:{account_id,title,message}
        
    })

    return  response
}