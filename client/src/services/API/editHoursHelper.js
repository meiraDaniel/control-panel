import axios from 'axios'



export default  async function editHoursHelper (id,newProject, newHour,token){
    const response = await axios.put("/myhours/edit", { 
        headers: { 'Authorization': token },
        data:{id,newProject,newHour}
    })

    return  response
}