import axios from 'axios'



export default  async function approveHourHelper (hourId,token){
    const response = await axios.put("/employees/approve", { 
        headers: { 'Authorization': token },
        data:{hourId}
             
    })

    return  response
}