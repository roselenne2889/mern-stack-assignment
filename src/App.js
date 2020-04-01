import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AdminScreen from "./admin-screen/admin-screen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin-screen">
          <AdminScreen></AdminScreen>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
