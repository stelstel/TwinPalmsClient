import React from 'react'

function ListCompanies(props) {
    return (
        <>
            <div className="vertical-menu">
                {props.companies.map((item, key) => {
                    return <div key={key} className="active">{item.name}</div>
                })} 
            </div>  
        </>
    )
}

export default ListCompanies
