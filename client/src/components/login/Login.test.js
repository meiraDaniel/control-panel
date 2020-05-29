import React from "react";
import Login from "./Login";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  render,
  cleanup,
  screen,
  fireEvent,
  act
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { expectTruthy, initialState,matchDocument } from "../../testUtils/testUtil";
import 'mutationobserver-shim';

afterEach(cleanup);

describe("component should render without error ", () => {
  const historyMock = { push: jest.fn() };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  test(" elements should render without error", () => {
    const { getByTestId} = render(
      <Router history={historyMock}>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    expectTruthy(getByTestId("snackbar"));
   expectTruthy(getByTestId("logo"));
    expectTruthy(getByTestId("image")); 
    expectTruthy(getByTestId("input-email")); 
    expectTruthy(getByTestId("input-password")); 

  })

/*   const entries = [
  { email: 'john_doe@yahoo',password:"test"},
  {  email: '',password:"test" },
  { email: 'marry123@test.com',password:""},
  
]

test.each(entries)('test with %s entry', async (entry) => { 
  const {getByTestId} = render(
    <Router history={historyMock}>
      <Provider store={store}>
        <Login />
      </Provider>
    </Router>
  );
  const emailInput = screen.getByTestId('input-email')
 

  await fireEvent.change(emailInput, { target: { value: entry.email } }); 
  await fireEvent.blur(emailInput)
  await act(async () => {
    fireEvent.submit(getByTestId("form"));
  });

  if (entry.email.length === 0) {
    expect(await screen.findByText("Ops, don't forget to enter your email")).not.toBeNull();
   
  }
  else{
    expect(await screen.getByTestId("form").textContent).not.toMatch(
      "Ops, don't forget to enter your email"
    )}
    await act(() => Promise.resolve()); 

})


test.each(entries)('test with %s entry', async (entry) => { 
  const {getByTestId} = render(
    <Router history={historyMock}>
      <Provider store={store}>
        <Login />
      </Provider>
    </Router>
  );
  const passwordInput = screen.getByTestId('input-password')


  await fireEvent.change(passwordInput, { target: { value: entry.password } }); 
    await fireEvent.blur(passwordInput)
    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    if (entry.password.length === 0) {
      expect(await screen.findByText("Ops, don't forget to enter your password")).not.toBeNull();
     
    }
    else{
      expect(await screen.getByTestId("form").textContent).not.toMatch(
        "Ops, don't forget to enter your password"
      )}
      await act(() => Promise.resolve()); 

}); */
})