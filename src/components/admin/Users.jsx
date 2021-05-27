import React, { useState, useEffect } from 'react'
import './Users.css';
import axios from 'axios';

function Users() {
   
    const url = 'https://localhost:44306/api/Users'
    const [users, setUsers] = useState();
    const [searchTerm, setSearchterm] = useState("");


    const sendGetRequest = async (url) => {
        try {
            const res = await axios.get(url);
            console.log(res.data);
            console.log('successfull get request')
            setUsers(res.data)

        } catch (err) {
            // Handle Error Here
            console.log("error with get request for users")
            console.error(err);
        }
    };
    useEffect(() => {   
        sendGetRequest(url)
    }, []) 

    return (
        <div style={{display: 'flex'}} className="users-container">
            <div><input onChange={e => {setSearchterm(e.target.value)}} className="users-input" type="text" placeholder="Search"  /><i className="fas fa-search"></i></div>
            {users && 
            users.filter((val) => {
                if (searchTerm === "") {
                    return val
                } else if (
                    val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) 
                    || val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) 
                    || val.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
                return null
            })
            .map((val, key) => {
                return (
                        <div key={key} className="users-userlist-container">
                            <div className="users-user">
                                <img className="users-avatar" src="/images/user.png" alt="user" />
                                <div>
                                    <div className="users-name">
                                        <p className="users-paragraph">{val.firstName}</p>
                                        <p className="users-paragraph">{val.lastName}</p>
                                    </div>
                                    <p className="users-paragraph users-email">{val.email}</p>
                                </div>
                            </div>
                            <div className="users-buttons">
                                <i className="fas fa-edit"></i>
                                <i className="fas fa-trash-alt"></i>
                            </div>
                        </div>
            )})}
        </div>
    )
}

export default Users
