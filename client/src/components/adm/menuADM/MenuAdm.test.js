import React from "react";
import MenuAdm from "./MenuAdm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  render,
  cleanup,
  screen,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { expectTruthy, initialState,matchDocument } from "../../../testUtils/testUtil";

afterEach(cleanup);
describe("navegation should render without error ", () => {
  const historyMock = { push: jest.fn() };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  test(" img should render without error", () => {
    const { getByTestId } = render(
      <Router history={historyMock}>
        <Provider store={store}>
          <MenuAdm />
        </Provider>
      </Router>
    );
    expectTruthy(getByTestId("menuadm-image"));
    
  });

  test("render  links", () => {
    const { getAllByTestId } = render(
      <Router history={historyMock}>
        <Provider store={store}>
          <MenuAdm />
        </Provider>
      </Router>
    );
    matchDocument(screen.getByText(/Employees/))
    matchDocument(screen.getByText(/New employee/))
   
  });

  const links = [
    { text: 'Employees', location: "/adm/dashboard",style:"color: white; margin-left: 3%; font-size: 4vh; font-weight: 700; text-decoration: none;" },
    { text: 'New employee', location: "/adm/employee-add", style:"color: white; margin-left: 3%; text-decoration: none;" },
 
  ];

   test.each(links)(" menu should have href and style",(link)=>{
    const { getAllByTestId } = render(
        <Router history={historyMock}>
          <Provider store={store}>
            <MenuAdm />
          </Provider>
        </Router>
      );
    

    const linkDom = screen.getByText(link.text); 

    expect(linkDom).toHaveAttribute("href", link.location);
    expect(linkDom).toHaveAttribute("style", link.style);

   }) 

});
