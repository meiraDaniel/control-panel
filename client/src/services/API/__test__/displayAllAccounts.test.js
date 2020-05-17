import axios from "axios";
import displayAllAccounts from "../displayAllAccounts";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const postId = 1

  test(" request successfull, retrieve the response", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(status));
    await expect(
      displayAllAccounts(postId,token)
    ).resolves.toEqual(status);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/employees", { 
      headers: { 'Authorization': token },
           
  });
  });

  test(" request failure, retrieve an error", async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(displayAllAccounts()).rejects.toThrow(error);
  });
})