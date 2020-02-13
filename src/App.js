import React, {useState, useEffect} from 'react';
import './App.css';


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
        document.title = params.count
    })
    useEffect(() => {
        window.addEventListener('resize', onResize, false)
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    },[])
    return (
        <button type="button" onClick={() => {
            setCount({count: params.count + 1})
        }}>点我({params.count})({size.width}x{size.height})</button>
    );

}

export default App;
