import axios from "axios";
import likepost from "../likepost";

jest.mock("axios");

describe(" fetch data should work ", () => {
  const status = 'OK'
const token  = 1234
const error = 'something went wrong'

const postId=2

  test(" request successfull, retrieve the response", async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve(status));
    await expect( likepost(postId,token)).resolves.toEqual(status);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith("/wall/like", { 
      headers: { 'Authorization': token },
     data:{postId}
      
  });
})
 test(" request failure, retrieve an error", async () => {
    axios.put.mockImplementation(() => Promise.reject(new Error(error)));
    await expect(likepost()).rejects.toThrow(error);
  })  
})