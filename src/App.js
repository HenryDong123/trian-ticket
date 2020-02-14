import React, {Component, useState, useEffect, createContext} from 'react';
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
    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick, false)
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick, false)

        }
    })
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
            <CountContext.Provider value={params.count}>
                <Foo/>
                <Bar/>
            </CountContext.Provider>

        </div>

    );

}

export default App;
