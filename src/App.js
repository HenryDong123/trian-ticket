import React, {
    useState,
    useEffect,
    useRef, useCallback,
} from 'react';
import './App.css';
function Counter(props) {
    return (
        <h1>Count: {props.count}</h1>
    )
}
function useCounter(count) {
    return (
        <h1>useCounter: {count}</h1>
    )
}
function useCount(defaultCount) {
    const [count, setCount] = useState(0)
    const it = useRef()
    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
    }, [])
    useEffect(() => {
        if (count >= 10) {
            clearInterval(it.current)
        }
    })
    return [count, setCount]
}
function useSize() {
    const [size,setSize] = useState(
        {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
    )
    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, [])
    useEffect(()=>{
        window.addEventListener('resize', onResize, false)
        return ()=> {
            window.removeEventListener('resize', onResize, false)

        }
    },[onResize])
    return size

}
function App() {
    const [count, setCount] = useCount()
    const TestUse = useCounter(count)
    const size = useSize()
    return (
        <div>
            <button type="button" onClick={() => {
                setCount(count + 1)
            }}>点我({count})
            </button>
            <Counter count={count}/>
            {TestUse}
            <h2>{size.width}x{size.height}</h2>
        </div>

    );

}

export default App;
