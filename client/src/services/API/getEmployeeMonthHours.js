import axios from 'axios'



export default  async function getEmployeeMonthHours (account_id,year,month,token){
    const response = await axios.get("/employees/month/hours?", { 
        headers: { 'Authorization': token },
        params:{account_id,year,month}
             
    })

    return  response
}