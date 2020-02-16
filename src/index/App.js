import React from "react";
import './App.css'
import {connect} from 'react-redux'
import Header from "../components/header/Header";
import Journey from "./components/journey/Journey";
import Submit from "./components/submit/Submit";
import DepartDate from "./components/depart-date/DepartDate";
import HighSpeed from "./components/high-speed/HighSpeed";

function App(props) {
    return (
        <div>
            <Header/>
            <Journey/>
            <DepartDate/>
            <HighSpeed/>
            <Submit/>
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return {}
    },
    function mapDispatchToProps(dispatch) {
        return {}
    }
)(App)