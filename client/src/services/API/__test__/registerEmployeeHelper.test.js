import axios from "axios";
import registerEmployeeHelper from "../registerEmployeeHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const error = 'something went wrong'
const formData=1


  test(" request successfull, retrieve the response", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(status));
    await expect( registerEmployeeHelper(formData)).resolves.toEqual(status)
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/register", formData ,{ 
        headers: { "Content-Type": "multipart/form-data" },
              
    });
})
    test(" request failure, retrieve an error", async () => {
    axios.post.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(registerEmployeeHelper()).rejects.toThrow(error);
  })   
})
