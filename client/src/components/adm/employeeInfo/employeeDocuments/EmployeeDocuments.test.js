import React from "react";
import {EmployeeDocuments} from "./EmployeeDocuments";
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
import { expectTruthy, initialState,matchDocument } from "../../../../testUtils/testUtil";
import 'mutationobserver-shim';

afterEach(cleanup);

describe("component should render without error ", () => {
  const historyMock = { push: jest.fn() };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  test(" elements should render without error", () => {
    const { getAllByTestId,getByTestId} = render(
      <Router history={historyMock}>
        <Provider store={store}>
          <EmployeeDocuments />
        </Provider>
      </Router>
    );
    expectTruthy(getAllByTestId("button"));
   expectTruthy(getByTestId("name-employees"));
  

  })


})