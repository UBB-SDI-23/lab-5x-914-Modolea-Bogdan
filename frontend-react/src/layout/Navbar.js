import { getRoles } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  // const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
  const toAddURL = '';
  const serverLink = 'http://localhost:8080/user';
    // const serverLink = '';

  const [role, setRole] = useState('');

  const getRoles = async() => {
    const data = JSON.parse(localStorage.getItem('login'));
    const username = await axios.get(serverLink + `/getUsername/${data.store}`);
    const result = await axios.get(serverLink + `/${username.data}/role`);
    setRole(result.data);
  }

  getRoles();

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/" + toAddURL}>Esports Manager</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className='btn btn-outline-light' to={"/" + toAddURL + "teams"}>Teams</Link>
                <Link className='btn btn-outline-light' to={"/" + toAddURL + "leagues"}>Leagues</Link>
                <Link className='btn btn-outline-light' to={"/" + toAddURL + "fans"}>Fans</Link>

                {  role === 'ROLE_ADMIN' ?
                    <Link className='btn btn-outline-light' to={"/" + toAddURL + "users"}>Users</Link>
                    : null
                }
            </div>
        </nav>
    </div>
  )
}
