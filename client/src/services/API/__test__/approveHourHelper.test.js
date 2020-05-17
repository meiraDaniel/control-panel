import axios from "axios";
import approveHoursHelper from "../approveHourHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const hourId = 1

  test(" request successfull, retrieve the response", async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve(status));
    await expect(
      approveHoursHelper(hourId,token)
    ).resolves.toEqual(status);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith("/employees/approve", { 
      headers: { 'Authorization': token },
      data:{hourId}
           
  });
  });

  test(" request failure, retrieve an error", async () => {
    axios.put.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(approveHoursHelper()).rejects.toThrow(error);
  });
})