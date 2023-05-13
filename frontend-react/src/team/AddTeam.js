import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTeam() {

    const toAddURL = '';
    const serverLink = 'http://localhost:8080/';
    const serverLinkUser = 'http://localhost:8080/user'
    // const serverLink = 'https://sdidemo.chickenkiller.com/';

    let navigate = useNavigate();
    console.log(localStorage.getItem('login'));
    
    const[league, setLeague] = useState('');

    const [team, setTeam] = useState({
        name: '',
        top: '',
        jungle: '',
        mid: '',
        bot: '',
        support: '',
        leagueID: 0,
        username: ''
    })

    const{name, top, jungle, mid, bot, support, username} = team;

    const onInputChange=(e)=>{
        setTeam({...team, [e.target.name]: e.target.value});
    }

    const onInputChange2=(e)=>{
        setLeague(e.target.value);
    }
        
    const onSubmit=async(e)=>{
        e.preventDefault();
      
        const result = await axios.get(`${serverLink}leagues/get-league-by-name/${league}`);
        team.leagueID = result.data.lid;
        console.log(team);

        if(team.name === '') { 
            toast.warn('Name cannot be left empty!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }

        if(!team.leagueID) {
            toast.warn('League not found!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }


        const token = JSON.parse(localStorage.getItem('login')).store;
        console.log(token);
        const currentUsername = await axios.get(serverLinkUser +`/getUsername/${token}`);
        console.log(currentUsername.data);

        team.username = currentUsername.data;

        console.log(team);

        await axios.post(serverLink + "teams", team);
        navigate("/" + toAddURL +  "teams");
    };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add Team</h2>

                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>Team Name</label>
                        <input type={'text'} className='form-control' name='name' placeholder='Enter Team Name' value={name} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='top' className='form-label'>Toplaner Name</label>
                        <input type={'text'} className='form-control' name='top' placeholder='Enter Toplaner Name' value={top} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='jungle' className='form-label'>Jungler Name</label>
                        <input type={'text'} className='form-control' name='jungle' placeholder='Enter Jungler Name' value={jungle} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='mid' className='form-label'>Midlaner Name</label>
                        <input type={'text'} className='form-control' name='mid' placeholder='Enter Midlaner Name' value={mid} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='bot' className='form-label'>Botlaner Name</label>
                        <input type={'text'} className='form-control' name='bot' placeholder='Enter Botlaner Name' value={bot} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='support' className='form-label'>Support Name</label>
                        <input type={'text'} className='form-control' name='support' placeholder='Enter Support Name' value={support} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='league' className='form-label'>League Name</label>
                        <input type={'text'} className='form-control' name='league' placeholder='Enter League Name' value={league} onChange={(e)=>onInputChange2(e)}/>
                    </div>

                    <button type='submit' className='btn btn-outline-primary'>Add Team</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/" + toAddURL + "teams"}>Cancel</Link>
                    <ToastContainer />
                </form>
            </div> 
        </div>
    </div>
  )
}
