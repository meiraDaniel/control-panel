import axios from 'axios'

export default  async function insertHelper (formData){
 
    const response = await axios.post("/myhours/insert", formData,{ 
        headers: { "Content-Type": "multipart/form-data" }
        
    })

    return  response
}