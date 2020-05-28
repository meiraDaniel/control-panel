import axios from "axios";
import getAllUploads from "../getAllUploads";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const error = 'something went wrong'
const account_id=1
const token = 1234

  test(" request successfull, retrieve the response", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(status));
    await expect( getAllUploads(account_id,token)).resolves.toEqual(status)
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/upload?", { 
      headers: { 'Authorization': token },
      params:{account_id}
           
  });
})
    test(" request failure, retrieve an error", async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(getAllUploads()).rejects.toThrow(error);
  })   
})
