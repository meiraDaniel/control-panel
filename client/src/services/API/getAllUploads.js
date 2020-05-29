 import axios from 'axios'



export default  async function getAllUploads (account_id,token){
    const response = await axios.get("/upload?", { 
        headers: { 'Authorization': token },
        params:{account_id}
             
    })

    return  response
} 