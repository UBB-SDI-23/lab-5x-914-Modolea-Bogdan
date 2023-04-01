import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function AddTeam() {

    let navigate = useNavigate();

    const [team, setTeam] = useState({
        name: '',
        top: '',
        jungle: '',
        mid: '',
        bot: '',
        support: ''
    })

    const{name, top, jungle, mid, bot, support} = team;

    const onInputChange=(e)=>{
        setTeam({...team, [e.target.name]: e.target.value});
    }

    const onSubmit=async(e)=>{
      e.preventDefault();
      await axios.post("http://localhost:8080/addTeam", team);
      navigate("/teams");
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
                    <button type='submit' className='btn btn-outline-primary'>Add Team</button>
                    <Link className='btn btn-outline-danger mx-2' to="/teams">Cancel</Link>
                </form>
            </div> 
        </div>
    </div>
  )
}
