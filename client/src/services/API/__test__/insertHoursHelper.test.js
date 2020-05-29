import axios from "axios";
import insertHelper from "../insertHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
  const formData = 1



  test(" request successfull, retrieve the response", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(status));
    await expect( insertHelper(formData)).resolves.toEqual(status);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/myhours/insert", formData, { 
      
      "headers": {"Content-Type": "multipart/form-data"}
})})

   test(" request failure, retrieve an error", async () => {
     const error = "error"
    axios.post.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(insertHelper()).rejects.toThrow(error);
  })  
})