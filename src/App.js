import React from "react";
import logo from "./logo.svg";
import AdminScreen from "./admin-screen/admin-screen";
import AdminLogin from "./admin-login/admin-login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/admin-screen">
                    <AdminScreen></AdminScreen>
                </Route>
                <Route path="/admin-login" component={AdminLogin}></Route>
                <Route path="/" component={AdminLogin}></Route>
            </Switch>
        </div>
    );
}

export default App;
