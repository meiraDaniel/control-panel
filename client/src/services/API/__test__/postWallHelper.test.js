import axios from "axios";
import postOnWAllHelper from "../postOnWAllHelper";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const error = 'something went wrong'
const token=1234
const account_id=1
const title = 'foo'
const message = 'foo'

  test(" request successfull, retrieve the response", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(status));
    await expect( postOnWAllHelper(account_id,title,message,token)).resolves.toEqual(status)
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/wall/post", { 
      headers: { 'Authorization': token },
     data:{account_id,title,message}
      
  });
})
    test(" request failure, retrieve an error", async () => {
    axios.post.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(postOnWAllHelper()).rejects.toThrow(error);
  })   
})
