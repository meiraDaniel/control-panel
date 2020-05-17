import axios from "axios";
import editHoursHelper from "../editHoursHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const id = 1
const newProject = 'foo'
const newHour = 'foo'

  test(" request successfull, retrieve the response", async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve(status));
    await expect(
      editHoursHelper(id,newProject, newHour,token)
    ).resolves.toEqual(status);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith("/myhours/edit", { 
      headers: { 'Authorization': token },
      data:{id,newProject,newHour}
  });
})
   test(" request failure, retrieve an error", async () => {
    axios.put.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(editHoursHelper()).rejects.toThrow(error);
  })
})