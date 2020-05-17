import axios from "axios";
import approveAllHours from "../approveAllHours";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'

  test(" request successfull, retrieve the response", async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve(status));
    await expect(
        approveAllHours(token)
    ).resolves.toEqual(status);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith("/employees/approveAll", {"headers": {"Authorization": 1234}});
  });

  test(" request failure, retrieve an error", async () => {
    axios.put.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(approveAllHours()).rejects.toThrow(error);
  });
})