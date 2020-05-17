import axios from "axios";
import deleteDataFromHours from "../deleteDataFromHours";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const id = 1

  test(" request successfull, retrieve the response", async () => {
    axios.delete.mockImplementationOnce(() => Promise.resolve(status));
    await expect(
      deleteDataFromHours(id,token)
    ).resolves.toEqual(status);
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith("/myhours/delete", { 
      headers: { 'Authorization': token },
      data:{id}
           
  });
  });

  test(" request failure, retrieve an error", async () => {
    axios.delete.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(deleteDataFromHours()).rejects.toThrow(error);
  });
})