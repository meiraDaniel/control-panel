import axios from 'axios'

export default  async function insertHelper (account_id,dayInput, hourInput,project,token){
    const day = parseInt(dayInput)
    const hour = parseInt(hourInput)
    const response = await axios.post("/myhours/insert", { 
      
        headers: { 'Authorization': token },
        data:{
            account_id:account_id,
            day:day,
            hour:hour,
            project:project}
    })

    return  response
}