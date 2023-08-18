import React from 'react'

export function HelloWorld() {
    const [count, setCount] = React.useState(0)
    return(
        <div className='d-flex'>
            <h1>Hello World</h1>
        </div>
    )
}