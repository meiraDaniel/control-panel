import axios from 'axios'



export default  async function getEmployeeHours (account_id,token){
    const response = await axios.get("/employees/hours?", { 
        headers: { 'Authorization': token },
        params:{account_id}
             
    })

    return  response
}