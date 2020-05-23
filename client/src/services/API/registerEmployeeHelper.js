import axios from 'axios'



export default  async function registerEmployeeHelper (formData){
    const response = await axios.post("/register", formData ,{ 
        headers: { "Content-Type": "multipart/form-data" },
              
    })

    return  response
}


