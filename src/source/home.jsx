import React from "react";
//import logo from './logo.svg';
import "./App.css";
import { Link } from "react-router-dom";
class home extends React.Component {
    render() {
        return (
            <div className="container1">
                <Link to="/network" style={{ textDecoration: "none" }}>
                    <div className="container2 shadow">
                        <img alt="" className="icon1" src={require("../images/growth.svg")}></img>
                        <div className="menuName">Networth Chart</div>
                    </div>
                </Link>
                <Link to="/holding" style={{ textDecoration: "none" }}>
                    <div className="container2 shadow">
                        <img alt="" className="icon1" src={require("../images/chart.svg")}></img>
                        <div className="menuName">Holdings table</div>
                    </div>
                </Link>
            </div>
        );
    }
}
export default home;
