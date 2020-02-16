import {createStore, combineReducers, applyMiddleware} from 'redux'
import reducer from "./reducer";
import thunk from 'redux-thunk'

export default createStore(
    combineReducers(reducer),
    {
        from: '北京',
        to: '上海',
        isCitySelectorVisible: false,
        currentSelectingLeftCity: false,
        cityData: null,
        isLoadingCityData: false,
        isDateSelectorVisible: false,
        departDate: [],
        highSpeed: false
    },
    applyMiddleware(thunk)
)