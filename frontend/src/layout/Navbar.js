import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Esports Manager</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className='btn btn-outline-light' to="/teams">Teams</Link>
                <Link className='btn btn-outline-light'>Leagues</Link>
                <Link className='btn btn-outline-light'>Fans</Link>
            </div>
        </nav>
    </div>
  )
}
