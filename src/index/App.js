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
    setDepartDate,
    setSelectedCity,
    showCitySelector,
    showDateSelector,
    toggleHighSpeed
} from "./actions";
import {bindActionCreators} from "redux";
import CitySelector from "../components/city-selector/CitySelector";
import DataSelector from "../components/date-selector/DataSelector";
import {h0} from "../common/fp";

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
        isDateSelectorVisible,
        highSpeed
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
    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector,
        }, dispatch)
    },[dispatch])
    const toggleHighSpeedCbs = useMemo(() => {
        return bindActionCreators({
            toggle: toggleHighSpeed,
        }, dispatch)
    },[dispatch])
    const onSelectDate = useCallback((day) => {
        console.log(1)
        if (!day) {
            return
        }
        if (day < h0()) {
            return
        }
        dispatch(setDepartDate(day))
        dispatch(hideDateSelector())

    }, [dispatch])
    return (
        <div>
            <div className={"header-wrapper"}>
                <Header title={'火车票'} onBack={onBack} noBack/>
            </div>
            <form action="./query.html" className={"form"}>
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <DepartDate time={departDate} {...departDateCbs}/>
                <HighSpeed highSpeed={highSpeed} {...toggleHighSpeedCbs}/>
                <Submit/>
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            />
            <DataSelector show={isDateSelectorVisible} {...dateSelectorCbs} onSelect={onSelectDate}/>
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