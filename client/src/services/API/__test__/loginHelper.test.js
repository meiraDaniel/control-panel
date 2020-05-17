import axios from "axios";
import loginHelper from "../loginHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const error = 'something went wrong'


const email = 'foo'
const password = 'foo'

  test(" request successfull, retrieve the response", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(status));
    await expect( loginHelper(email,password)).resolves.toEqual(status);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/login", {
      email: email,
      password:password
  });
})
   test(" request failure, retrieve an error", async () => {
    axios.post.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(loginHelper()).rejects.toThrow(error);
  })  
})
