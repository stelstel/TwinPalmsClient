import React from 'react'
import './Lists.css'


function ListOutlets(props) {

    return (
        <>
            <div className="vertical-menu">
                {props.outlets.map((item, key) => {
                    console.log(item)
                    return <div key={key} className="active">{item.name}</div>
                })}
            </div>
        </>
    )
}

export default ListOutlets
