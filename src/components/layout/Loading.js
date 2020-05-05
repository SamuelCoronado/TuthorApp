import React from 'react'
import loading from './loading.gif'

const Loading = ({height, width}) => {
    return (
        <img src={loading} alt="Loading" style={{width:width, height: height}}/>
        )
}

export default Loading
