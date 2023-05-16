import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

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

    const[currentUser, setCurrentUser] = useState('');
    const[currentRole, setCurrentRole] = useState('');
    const[currentPages, setCurrentPages] = useState(0);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async()=>{
        const token = JSON.parse(localStorage.getItem('login')).store;
        const myUser = await axios.get(`${serverLink}/getUsername/${token}`);
        const myRole = await axios.get(`${serverLink}/${myUser.data}/role`);
        // console.log(myUser.data);
        // console.log(myRole.data);

        setCurrentUser(myUser.data);
        setCurrentRole(myRole.data);

        const result = await axios.get(serverLink + `/${username}`);
        const cntL = await axios.get(serverLink + `/${username}/leagues`);
        const cntT = await axios.get(serverLink + `/${username}/teams`);
        const cntF = await axios.get(serverLink + `/${username}/fans`);
        counters.leagues = cntL.data;
        counters.teams = cntT.data;
        counters.fans = cntF.data;
        setUser(result.data);
        setCurrentPages(result.data.recordsOnPage);
    }

    const onInputChange=(e)=>{
        setCurrentPages(e.target.value);
    }

    const updatePages = async()=>{
        try{
            const token = JSON.parse(localStorage.getItem('login')).store;
            console.log(token);

            await axios.put(serverLink + `/update/${username}/pages/${currentPages}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        }
        catch(err){
            console.log(err.message);
            toast.error('Error: ' + err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            return;
        }
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
                <Link className='btn btn-primary my-2' to={"/"}>Back</Link><br></br>
                {
                    currentUser === user.name || currentRole === 'ADMIN' ?
                        <div>
                            <div className='mb-3'>
                                <label htmlFor='currentPages' className='form-label'>Current Pages</label>
                                <input type={'number'} className='form-control' name='currentPages' placeholder='Enter Pages' value={currentPages} onChange={(e)=>onInputChange(e)}/>
                            </div>
                            <button onClick={updatePages} className='btn btn-primary my-2'>Edit Pages</button>
                            <ToastContainer />
                        </div>
                    :

                    null
                }
            </div>
        </div>
    </div>
  )
}
