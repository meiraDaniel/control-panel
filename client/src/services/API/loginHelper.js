import axios from 'axios'

/**
 * @function loginHelper -send data to the server and  get the user information back in case the user already exists in our database 
 * @param {string} email - e-mail that comes from the form
 * @param {string} password - password that comes from the form
 */

export default  async function loginHelper (email,password){
    const response = await axios.post("/login", {
        email: email,
        password:password
    })

    return  response
}