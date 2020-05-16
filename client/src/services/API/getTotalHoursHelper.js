import axios from 'axios'



export default  async function getTotalHoursHelper (account_id,token){
    const response = await axios.get("/myhours/total?", {
        headers: { 'Authorization': token },
        params:{account_id:account_id}
        
    })

    return  response
}