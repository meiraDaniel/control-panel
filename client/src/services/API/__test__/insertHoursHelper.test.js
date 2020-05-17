import axios from "axios";
import insertHelper from "../insertHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const account_id = 1
const dayInput =1
const hourInput=2
const project = 'foo'

const day =1
const hour=2

  test(" request successfull, retrieve the response", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(status));
    await expect( insertHelper(account_id,dayInput, hourInput,project,token)).resolves.toEqual(status);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/myhours/insert", { 
      
      headers: { 'Authorization': token },
      data:{
          account_id:account_id,
          day:day,
          hour:hour,
          project:project}
  });
})
   test(" request failure, retrieve an error", async () => {
    axios.post.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(insertHelper()).rejects.toThrow(error);
  })  
})