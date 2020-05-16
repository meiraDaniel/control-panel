import axios from 'axios'



export default  async function deleteDataFromHours (id,token){
    const response = await axios.delete("/myhours/delete", { 
        headers: { 'Authorization': token },
       data:{id}
        
    })

    return  response
}