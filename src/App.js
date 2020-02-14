import React, {Component, useState, useEffect, createContext, useContext, useMemo} from 'react';
import './App.css';

const CountContext = createContext()

class Foo extends Component {
    render() {
        return (
            <CountContext.Consumer>
                {
                    count => <h1>Foo: {count}</h1>
                }
            </CountContext.Consumer>
        )
    }
}

function Counter() {
    const count = useContext(CountContext)
    return (
        <h1>Counter: {count}</h1>
    )
}

function TestMemo(props) {
    return (
        <h1>TestMemo: {props.count}</h1>
    )
}

class Bar extends Component {
    static contextType = CountContext

    render() {
        const count = this.context
        return (
            <h1>Bar: {count}</h1>

        )
    }
}

function App() {
    const [params, setCount] = useState({count: 0})
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })
    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }
    useEffect(() => {
        console.log('Count:' + params.count)
    }, [params.count])
    useEffect(() => {
        document.title = params.count
    })
    useEffect(() => {
        window.addEventListener('resize', onResize, false)
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [])
    const onClick = () => {
        console.log('click')
    }
    // 渲染后
    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick, false)
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick, false)

        }
    })
    // 渲染期间
    const double = useMemo(() => {
        return params.count * 2
    }, [params.count])
    const half = useMemo(()=>{
        return double / 4
    },[double])
    return (
        <div>
            <button type="button" onClick={() => {
                setCount({count: params.count + 1})
            }}>点我({params.count})
            </button>
            {
                params.count % 2
                    ? <span id={'size'}>({size.width}x{size.height})</span>
                    : <p id={'size'}>奥利给</p>
            }
            <p>double: {double}</p>
            <TestMemo count={params.count}/>
            <CountContext.Provider value={params.count}>
                <Foo/>
                <Bar/>
                <Counter/>
            </CountContext.Provider>

        </div>

    );

}

export default App;
