import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

export default function Home() {

  const logout = () => {
    localStorage.clear();
    alert('You logged out!');
    window.location.reload();
  }

  return (
    <div>
      <h3>
          This is the home page. You can use this page to select a page to view.
      </h3>
      { (JSON.parse(localStorage.getItem("login")) == null || !JSON.parse(localStorage.getItem("login")).login) ?
        <div>
          <Link className='btn btn-primary my-2' to={"/login"}>Login</Link>
          <h1></h1>
          <Link className='btn btn-primary my-2' to={"/register"}>Register</Link>
          <h1></h1>
        </div>

         :
      
      <button onClick={logout} className='btn btn-primary my-2'>Logout</button>
    } 
    </div>
  )
}
