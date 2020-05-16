import axios from 'axios'



export default  async function getAllDataFromHours (account_id,token){
    const response = await axios.get("/myhours?", { 
        headers: { 'Authorization': token },
        params:{account_id}
    })

    return  response
}