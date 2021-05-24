import React, { useState } from 'react'
import './Users.css';

function Users() {

    const [searchTerm, setSearchterm] = useState("");

    const users = [
        {name: 'Robin Granberg'},
        {name: 'Claes Lexicon'},
        {name: 'Stefan Lexicon'},
        {name: 'Anette Lexicon'},
        {name: 'Marcelo Lexicon'},
        {name: 'Sheliann Lexicon'},
        {name: 'Robin Granberg'},
        {name: 'Claes Lexicon'},
        {name: 'Stefan Lexicon'},
        {name: 'Anette Lexicon'},
        {name: 'Marcelo Lexicon'},
        {name: 'Sheliann Lexicon'},
        {name: 'Robin Granberg'},
        {name: 'Claes Lexicon'},
        {name: 'Stefan Lexicon'},
        {name: 'Anette Lexicon'},
        {name: 'Marcelo Lexicon'},
        {name: 'Sheliann Lexicon'},
        {name: 'Robin Granberg'},
        {name: 'Claes Lexicon'},
        {name: 'Stefan Lexicon'},
        {name: 'Anette Lexicon'},
        {name: 'Marcelo Lexicon'},
        {name: 'Sheliann Lexicon'},
    ]

    return (
        <div style={{display: 'flex'}} className="users-container">
            <div><input onChange={e => {setSearchterm(e.target.value)}} className="users-input" type="text" placeholder="Search"  /><i className="fas fa-search"></i></div>
            {users.filter((val) => {
                if (searchTerm === "") {
                    return val
                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
                return null
            })
            .map((val, key) => {
                return (
                    <>
                        <div className="users-userlist-container">
                            <div className="users-user" key={key}>
                                <img className="users-avatar" src="/images/user.png" alt="user" />
                                <p className="users-paragraph">{val.name}</p>
                            </div>
                            <div className="users-buttons">
                                <i class="fas fa-edit"></i>
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    </>

            )})}
        </div>
    )
}

export default Users
