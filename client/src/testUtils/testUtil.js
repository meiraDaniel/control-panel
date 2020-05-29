export const expectTruthy = (receiveObj) => {
    expect(receiveObj).toBeTruthy() && expect(receiveObj).not.toBeNull();
  };
  export const initialState = {
    state: [],
    reducer: {},
  };


  export const matchDocument = (receiveObj) => {
    expect(receiveObj).toBeInTheDocument()
  };
