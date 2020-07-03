import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style/topNavAdm.scss";
import "./style/formMoreInputs.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import throttle from "lodash/throttle";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./store/index";
import { loadState, saveState } from "./services/loadState";
import { ThemeProvider } from "@material-ui/core/styles";
import {palette} from "./theme";

const store = createStore(
  allReducers,
  loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }),
  1000
);




ReactDOM.render(
  <ThemeProvider theme={palette}>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
