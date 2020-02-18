import './DataSelector.css'
import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import Header from "../header/Header";
import {h0} from "../../common/fp";


Day.propTypes = {
    day: propTypes.number,
    onSelect: propTypes.func.isRequired,
}

function Day(props) {
    const {
        onSelect,
        day,
    } = props
    if (!day) {
        return (
            <td className="null"></td>
        )
    }
    const classess = []
    const now = h0()

    if (day < now) {
        classess.push('disabled')
    }
    if ([6, 0].includes(new Date(day).getDay())) {
        classess.push('weekend')
    }
    const dateStr = now === day ? '今日' : new Date(day).getDate()
    return (
        <td className={classNames(classess)} onClick={() => {
            onSelect(day)
        }}>
            {dateStr}
        </td>
    )
}

Week.propTypes = {
    days: propTypes.array.isRequired,
    onSelect: propTypes.func.isRequired,
}

function Week(props) {
    const {
        onSelect,
        days,
    } = props
    return (
        <tr className="date-table-days">
            {
                days.map((day, idx) => {
                    return (<Day day={day} onSelect={onSelect} key={idx}/>)
                })

            }
        </tr>
    )
}

Month.propTypes = {
    startingTimeInMonth: propTypes.number.isRequired,
    onSelect: propTypes.func.isRequired,
}

function Month(props) {
    const {
        startingTimeInMonth,
        onSelect
    } = props
    const startDay = new Date(startingTimeInMonth)
    const currentDay = new Date(startingTimeInMonth)
    let days = []
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime())
        currentDay.setDate(currentDay.getDate() + 1)
    }
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null)
        .concat(days)
    const lastDay = new Date(days[days.length - 1])
    days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null))
    const weeks = []
    for (let row = 0; row < days.length / 7; row++) {
        const week = days.slice(row * 7, (row + 1) * 7)
        weeks.push(week)
    }
    return (
        <table className="date-table">
            <thead>
            <tr>
                <td colSpan="7">
                    <h5>
                        {startDay.getFullYear()}年{startDay.getMonth() + 1}月
                    </h5>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr className="date-table-weeks">
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th className="weekend">六</th>
                <th className="weekend">日</th>
            </tr>
            {
                weeks.map((week, index) => {
                    return (
                        <Week key={index} days={week} onSelect={onSelect}/>
                    )
                })
            }
            </tbody>
        </table>
    )
}

DataSelector.propTypes = {
    show: propTypes.bool.isRequired,
    onSelect: propTypes.func.isRequired,
    onBack: propTypes.func.isRequired
}

function DataSelector(props) {
    const {
        show,
        onSelect,
        onBack
    } = props
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    now.setDate(1)

    const monthSequence = [now.getTime()]
    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())
    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())

    return (
        <div className={classNames('date-selector', {
            hidden: !show
        })}>
            <Header title="选择日期" onBack={onBack}/>
            <div className="date-selector-tables">
                {
                    monthSequence.map((month) => {
                        return (<Month key={month} startingTimeInMonth={month} onSelect={onSelect}/>)
                    })
                }
            </div>
        </div>
    )
}

export default DataSelector