import './DataSelector.css'
import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import Header from "../header/Header";

DataSelector.propTypes = {
    show:propTypes.bool.isRequired,
    onSelect: propTypes.func.isRequired,
    onBack: propTypes.func.isRequired
}

function DataSelector(props) {
    const {
        show,
        onSelect,
        onBack
    } = props
    return (
        <div className={classNames('date-selector', {
            hidden: !show
        })}>
            <Header title="选择日期" onBack={onBack}/>
            <div className="date-selector-tables">g</div>
        </div>
    )
}

export default DataSelector