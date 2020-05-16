import axios from 'axios'



export default  async function getPostWallHelper (token){
    const response = await axios.get("/wall", {
        headers: { 'Authorization': token },
               
    })

    return  response
}