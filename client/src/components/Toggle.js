import React from 'react'
import styled from 'styled-components'

export default function Toggle({onChange}) {

    return (
        <label className="toggle-switch">
            <input type="checkbox" onChange={onChange}/>
            <span className="switch"/>
        </label>
 
    )
}
