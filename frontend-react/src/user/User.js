import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'

export default function User() {
    // const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    const toAddURL = '';
    const serverLink = 'http://localhost:8080/user';
    // const serverLink = 'https://sdidemo.chickenkiller.com/fans';
    // const serverLink = 'http://esportsleaguemanager-env.eba-tbki6djt.eu-north-1.elasticbeanstalk.com/fans';

    const [user, setUser] = useState({
        name: '',
        age: 0,
        email: '',
        location: '',
        roles: ''
    });

    const [counters, setCounters] = useState({
        fans: 0,
        leagues: 0,
        teams: 0
    });

    const {username} = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async()=>{
        const result = await axios.get(serverLink + `/${username}`);
        setUser(result.data);
        const cntL = await axios.get(serverLink + `/${username}/leagues`);
        const cntT = await axios.get(serverLink + `/${username}/teams`);
        const cntF = await axios.get(serverLink + `/${username}/fans`);
        counters.leagues = cntL;
        counters.teams = cntT;
        counters.fans = cntF;
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>User Details</h2>
                <div className='card'>
                    <div className='card-header'>
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'><b>Name: {user.name}</b></li>
                            <li className='list-group-item'><b>Age: {user.email}</b></li>
                            <li className='list-group-item'><b>Role: {user.roles}</b></li>
                            <li className='list-group-item'><b>Age: {user.age}</b></li>
                            <li className='list-group-item'><b>Location: {user.location}</b></li>
                            <li className='list-group-item'><b>Teams added: {counters.teams}</b></li>
                            <li className='list-group-item'><b>Leagues added: {counters.leagues}</b></li>
                            <li className='list-group-item'><b>Fans added: {counters.fans}</b></li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/"}>Back</Link>
            </div>
        </div>
    </div>
  )
}
