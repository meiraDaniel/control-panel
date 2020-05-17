import axios from "axios";
import getAllMyPosts from "../getAllMyPosts";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'
const account_id = 1
const role = 'foo'
const email = 'foo'
  test(" request successfull, retrieve the response", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(status));
    await expect( getAllMyPosts(account_id,token)).resolves.toEqual(status);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("/wall/myposts", { 
      headers: { 'Authorization': token },
     data:{account_id}
      
  });
})
    test(" request failure, retrieve an error", async () => {
    axios.post.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(getAllMyPosts()).rejects.toThrow(error);
  })  
})