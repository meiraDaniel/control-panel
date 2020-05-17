import axios from 'axios'



export default  async function displayAllAccounts (id,token){
    const response = await axios.get("/employees", { 
        headers: { 'Authorization': token },
             
    })

    return  response
}