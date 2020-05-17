import axios from "axios";
import getTotalHoursHelper from "../getTotalHoursHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const account_id = 1

  test(" request successfull, retrieve the response", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(status));
    await expect( getTotalHoursHelper(account_id,token)).resolves.toEqual(status);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/myhours/total?", {
      headers: { 'Authorization': token },
      params:{account_id:account_id}
      
  });
})
   test(" request failure, retrieve an error", async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(getTotalHoursHelper()).rejects.toThrow(error);
  }) 
})