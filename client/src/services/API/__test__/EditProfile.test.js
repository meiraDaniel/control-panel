import axios from "axios";
import editProfile from "../editProfile";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const account_id = 1
const role = 'foo'
const email = 'foo'
  test(" request successfull, retrieve the response", async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve(status));
    await expect(
      editProfile(account_id,role,email,token)
    ).resolves.toEqual(status);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith("/settings", { 
      headers: { 'Authorization': token },
     data:{account_id,role,email}
      
  });
})
   test(" request failure, retrieve an error", async () => {
    axios.put.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(editProfile()).rejects.toThrow(error);
  })
})