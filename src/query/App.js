import './App.css'
import React, {useCallback} from "react";
import {connect} from 'react-redux'
import Nav from "../index/components/nav/Nav";
import List from "./list/List";
import Bottom from "./bottom/Bottom";
import Header from "../components/header/Header";

function App(props) {
    const {from, to} = props
    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    return (
        <div>
            <div className="header-wrapper">
                <Header title={from + '-' + to} onBack={onBack}/>
            </div>
            <Nav/>
            <List/>
            <Bottom/>
        </div>
    )

}

export default connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }
)(App)