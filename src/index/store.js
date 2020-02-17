import {createStore, combineReducers, applyMiddleware} from 'redux'
import reducer from "./reducer";
import thunk from 'redux-thunk'

export default createStore(
    combineReducers(reducer),
    {
        from: '长沙',
        to: '上海',
        isCitySelectorVisible: false,
        currentSelectingLeftCity: false,
        cityData: null,
        isLoadingCityData: false,
        isDateSelectorVisible: false,
        departDate: Date.now(),
        highSpeed: false,
    },
    applyMiddleware(thunk)
)