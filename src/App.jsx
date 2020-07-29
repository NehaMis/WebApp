import React from "react";
import "./index.css";

import HoldingTables from "./source/holdingTables";
import Home from "./source/home";
import NetworthChart from "./source/networthChart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function index() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/holding">
                    <HoldingTables />
                </Route>
                <Route path="/network">
                    <NetworthChart />
                </Route>
            </Switch>
        </Router>
    );
}
