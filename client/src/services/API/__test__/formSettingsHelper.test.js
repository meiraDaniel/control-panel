import axios from "axios";
import formSettigHelper from "../formSettigHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const account_id = 1
const role = 'foo'
const email = 'foo'
  test(" request successfull, retrieve the response", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(status));
    await expect( formSettigHelper(account_id,token)).resolves.toEqual(status);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/display/profile?', { 
      headers: { 'Authorization': token },
     params:{account_id}
      
  });
})
   test(" request failure, retrieve an error", async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(formSettigHelper()).rejects.toThrow(error);
  }) 
})