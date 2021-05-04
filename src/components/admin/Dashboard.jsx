import React from 'react'
import './Dashboard.css'
import { Button } from './Button'

function Dashboard() {
    return (
        <>
            <main className='dashboard-object-container'>
                <Button>
                    <i className="fas fa-users-cog"></i>
                    <p>Manage users</p>
                </Button>
                <Button>
                    <i className="fas fa-icons"></i>
                    <p>Change events</p>
                </Button>
                <Button>
                    <i className="fas fa-images"></i>
                    <p>Homepage background</p>
                </Button>
                <Button>
                    <i className="fas fa-cog"></i>
                    <p>Settings</p>
                </Button>
            </main>
            
        </>
    )
}

export default Dashboard
