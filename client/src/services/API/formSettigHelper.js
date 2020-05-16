import axios from 'axios'



export default  async function formSettigHelper (account_id,token){
    const response = await axios.get('/display/profile?', { 
        headers: { 'Authorization': token },
       params:{account_id}
        
    })

    return  response
}