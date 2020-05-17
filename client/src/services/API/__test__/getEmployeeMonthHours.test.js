import axios from "axios";
import getEmployeeMonthHours from "../getEmployeeMonthHours";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const account_id = 1
const month = 1
const year = 1
  test(" request successfull, retrieve the response", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(status));
    await expect( getEmployeeMonthHours(account_id,year,month,token)).resolves.toEqual(status);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/employees/month/hours?", { 
      headers: { 'Authorization': token },
      params:{account_id,year,month}
           
  });
})
   test(" request failure, retrieve an error", async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(getEmployeeMonthHours()).rejects.toThrow(error);
  }) 
})