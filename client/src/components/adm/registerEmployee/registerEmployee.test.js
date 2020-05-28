import React from "react";
import RegisterEmployee from "./RegisterEmployee";
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
import { expectTruthy, initialState,matchDocument } from "../../../testUtils/testUtil";
import 'mutationobserver-shim';

afterEach(cleanup);
describe("component should render without error ", () => {
  const historyMock = { push: jest.fn() };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  test(" elemtns should render without error", () => {
    const { getAllByTestId ,getByTestId} = render(
      <Router history={historyMock}>
        <Provider store={store}>
          <RegisterEmployee />
        </Provider>
      </Router>
    );
    expectTruthy(getByTestId("register-employee-form"));
   expectTruthy(getAllByTestId("register-employee-label"));
    expectTruthy(getByTestId("register-employee-button")); 

  })

  const entries = [
  { name: 'John', email: 'john_doe@yahoo',lastname:"test", role:""},
  { name: 'Jo', email: '',lastname:"test", role:"test" },
  { name: '', email: 'marry123@test.com',lastname:"test", role:"test" },
  { name: 'Robert', email: 'robert_bell@example.com',lastname:"", role:"test"}
]

test.each(entries)('test with %s entry', async (entry) => { 
  const {getByTestId} = render(
    <Router history={historyMock}>
      <Provider store={store}>
        <RegisterEmployee />
      </Provider>
    </Router>
  );
  const firstnameInput = screen.getByTestId('register-employee-input-name')
 

  await fireEvent.change(firstnameInput, { target: { value: entry.name } }); 
  await fireEvent.blur(firstnameInput)
  await act(async () => {
    fireEvent.submit(getByTestId("register-employee-form"));
  });
  if (entry.name.length === 0) {
    expect(await screen.findByText("Name field is required")).not.toBeNull();
   
  }
  else{
    expect(await screen.getByTestId("register-employee-form").textContent).not.toMatch(
      "Name field is required"
    )}
    await act(() => Promise.resolve()); 

})
test.each(entries)('test with %s entry', async (entry) => { 
  const {getByTestId} = render(
    <Router history={historyMock}>
      <Provider store={store}>
        <RegisterEmployee />
      </Provider>
    </Router>
  );
  const lastnameInput = screen.getByTestId('register-employee-input-last')


  await fireEvent.change(lastnameInput, { target: { value: entry.lastname } }); 
    await fireEvent.blur(lastnameInput)
    await act(async () => {
      fireEvent.submit(getByTestId("register-employee-form"));
    });
    if (entry.lastname.length === 0) {
      expect(await screen.findByText("Lastname field is required")).not.toBeNull();
     
    }
    else{
      expect(await screen.getByTestId("register-employee-form").textContent).not.toMatch(
        "Lastname field is required"
      )}
      await act(() => Promise.resolve()); 

})
test.each(entries)('test with %s entry', async (entry) => { 
  const {getByTestId} = render(
    <Router history={historyMock}>
      <Provider store={store}>
        <RegisterEmployee />
      </Provider>
    </Router>
  );
 
  const emailInput = screen.getByTestId('register-employee-input-email')
  

 
  await fireEvent.change(emailInput, { target: { value: entry.email } }); 
  await fireEvent.blur(emailInput)
  await act(async () => {
    fireEvent.submit(getByTestId("register-employee-form"));
  });
  if (entry.email.length === 0) {
    expect(await screen.findByText("Email field is required")).not.toBeNull();
   
  }
  else{
    expect(await screen.getByTestId("register-employee-form").textContent).not.toMatch(
      "Email field is required"
    )}
    await act(() => Promise.resolve()); 

})

test.each(entries)('test with %s entry', async (entry) => { 
  const {getByTestId} = render(
    <Router history={historyMock}>
      <Provider store={store}>
        <RegisterEmployee />
      </Provider>
    </Router>
  );
 
  const roleInput = screen.getByTestId('register-employee-input-role')

 
  await fireEvent.change(roleInput, { target: { value: entry.role } }); 
      await fireEvent.blur(roleInput)
      await act(async () => {
        fireEvent.submit(getByTestId("register-employee-form"));
      });
      if (entry.role.length === 0) {
        expect(await screen.findByText("Role field is required")).not.toBeNull();
       
      }
      else{
        expect(await screen.getByTestId("register-employee-form").textContent).not.toMatch(
          "Role field is required"
        )}
        await act(() => Promise.resolve()); 

      
})
})