import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function AddTeam() {

    const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    // const toAddURL = '';

    let navigate = useNavigate();

    const [league, setLeague] = useState({
        abbreviation: '',
        region: '',
        year: 0,
        bestPlayer: '',
        audience: 0
    })

    const{abbreviation, region, year, bestPlayer, audience} = league;

    const onInputChange=(e)=>{
        setLeague({...league, [e.target.name]: e.target.value});
    }

    const onSubmit=async(e)=>{
      e.preventDefault();
      await axios.post("http://localhost:8080/leagues", league);
      navigate("/" + toAddURL +  "leagues");
    };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add League</h2>

                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='abbreviation' className='form-label'>League Name</label>
                        <input type={'text'} className='form-control' name='abbreviation' placeholder='Enter League Name' value={abbreviation} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='region' className='form-label'>Region Name</label>
                        <input type={'text'} className='form-control' name='region' placeholder='Enter Region Name' value={region} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='year' className='form-label'>First Year</label>
                        <input type={'number'} className='form-control' name='year' placeholder='Enter First Year' value={year} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='bestPlayer' className='form-label'>Best Player Name</label>
                        <input type={'text'} className='form-control' name='bestPlayer' placeholder='Enter Best Player Name' value={bestPlayer} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='audience' className='form-label'>Audience Number</label>
                        <input type={'number'} className='form-control' name='audience' placeholder='Enter Audience Number' value={audience} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Add League</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/" + toAddURL + "leagues"}>Cancel</Link>
                </form>
            </div> 
        </div>
    </div>
  )
}
