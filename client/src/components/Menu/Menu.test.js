import React from "react";
import Menu from "./Menu";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  render,
  fireEvent,
  act,
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
});
