import axios from 'axios'



export default  async function editProfile (account_id,role,email,token){
    const response = await axios.put("/settings", { 
        headers: { 'Authorization': token },
       data:{account_id,role,email}
        
    })

    return  response
}