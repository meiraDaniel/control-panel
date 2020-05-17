import axios from 'axios'



export default  async function approveAllHourHelper (token){
    const response = await axios.put("/employees/approveAll", { 
        headers: { 'Authorization': token },
       
             
    })

    return  response
}