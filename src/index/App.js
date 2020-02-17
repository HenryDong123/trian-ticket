import React, {useCallback, useMemo} from "react";
import './App.css'
import {connect} from 'react-redux'
import Header from "../components/header/Header";
import Journey from "./components/journey/Journey";
import Submit from "./components/submit/Submit";
import DepartDate from "./components/depart-date/DepartDate";
import HighSpeed from "./components/high-speed/HighSpeed";
import {
    exchangeFromTo,
    fetchCityData,
    hideCitySelector,
    hideDateSelector,
    setSelectedCity,
    showCitySelector,
    showDateSelector
} from "./actions";
import {bindActionCreators} from "redux";
import CitySelector from "../components/city-selector/CitySelector";
import DataSelector from "../components/date-selector/DataSelector";

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
        isDateSelectorVisible
    } = props
    console.log(props)
    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    // const doExchangeFromTo = useCallback(() => {
    //     dispatch(exchangeFromTo())
    // }, [dispatch])
    // const doShowCitySelector = useCallback((m) => {
    //     dispatch(showCitySelector(m))
    // }, [dispatch])
    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch)
    }, [dispatch])
    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity
        }, dispatch)
    }, [dispatch])
    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector
        }, dispatch)
    }, [dispatch])
    const dateSelectorCbs = useMemo(()=>{
        return bindActionCreators({
            onBack: hideDateSelector
        },dispatch)
    })
    return (
        <div>
            <div className={"header-wrapper"}>
                <Header title={'火车票'} onBack={onBack}/>
            </div>
            <form className={"form"}>
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <DepartDate time={departDate} {...departDateCbs}/>
                <HighSpeed/>
                <Submit/>
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            />
            <DataSelector show={isDateSelectorVisible} {...dateSelectorCbs}/>
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