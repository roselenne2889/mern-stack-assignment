import React from "react";
import logo from "./logo.svg";
import AdminScreen from "./admin-screen/admin-screen";
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
            </Switch>
            {/* <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                crossOrigin="anonymous"
            /> */}
        </div>
    );
}

export default App;
