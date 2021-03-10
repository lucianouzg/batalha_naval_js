import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
//import registerServiceWorker from "./registerServiceWorker";
import {
  // BrowserRouter,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route path="/" exact={true} component={Home} />
        <Route path={"/app"} component={Chat} />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
//registerServiceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
