import React from "react";
import Menu from "./Menu";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  render,
  cleanup,
  screen,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { expectTruthy, initialState,matchDocument } from "../../testUtils/testUtil";

afterEach(cleanup);
describe("navegation should render without error ", () => {
  const historyMock = { push: jest.fn() };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  test(" img and span should render without error", () => {
    const { getAllByTestId } = render(
      <Router history={historyMock}>
        <Provider store={store}>
          <Menu />
        </Provider>
      </Router>
    );
    expectTruthy(getAllByTestId("menu-span"));
    expectTruthy(getAllByTestId("menu-image"));
  });

  test("render  links", () => {
    const { getAllByTestId } = render(
      <Router history={historyMock}>
        <Provider store={store}>
          <Menu />
        </Provider>
      </Router>
    );
    matchDocument(screen.getByText(/Settings/))
    matchDocument(screen.getByText(/My wall/))
    matchDocument(screen.getByText(/My Hours/))
    matchDocument(screen.getByText(/Dashboard/))
  });

  const links = [
    { text: 'My wall', location: "/wall",style:"font-family: Titillium Web; color: rgb(136, 135, 135); text-decoration: none; font-size: 3vh;" },
    { text: 'My Hours', location: "/myhours" ,style:"font-family: Titillium Web; color: rgb(136, 135, 135); text-decoration: none; font-size: 3vh;"},
    { text: 'Dashboard', location: "/dashboard" ,style:"font-family: Titillium Web; color: rgb(136, 135, 135); text-decoration: none; font-size: 3vh;"},
    { text: 'Settings', location: "/settings" ,style:"font-family: Titillium Web; color: rgb(136, 135, 135); text-decoration: none; font-size: 3vh;"},
  ];

   test.each(links)(" menu should have href",(link)=>{
    const { getAllByTestId } = render(
        <Router history={historyMock}>
          <Provider store={store}>
            <Menu />
          </Provider>
        </Router>
      );
    

    const linkDom = screen.getByText(link.text); 

    expect(linkDom).toHaveAttribute("href", link.location);
    expect(linkDom).toHaveAttribute("style", link.style);
   }) 

});
