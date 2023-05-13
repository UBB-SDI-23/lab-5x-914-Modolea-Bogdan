import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTeam() {

    // const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    const toAddURL = '';

    const serverLink = 'http://localhost:8080/leagues';
    const serverLinkUser = 'http://localhost:8080/user'
    // const serverLink = 'https://sdidemo.chickenkiller.com/leagues';
    // const serverLink = 'http://esportsleaguemanager-env.eba-tbki6djt.eu-north-1.elasticbeanstalk.com/leagues';

    let navigate = useNavigate();

    const [league, setLeague] = useState({
        abbreviation: '',
        region: '',
        year: 0,
        bestPlayer: '',
        audience: 0,
        description: '',
        username: ''
    })

    const possibleRegions = ['EU', 'NA', 'PCS', 'JP', 'KR', 'CN', 'OCE'];

    const{abbreviation, region, year, bestPlayer, audience, description, username} = league;

    const onInputChange=(e)=>{
        setLeague({...league, [e.target.name]: e.target.value});
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        
        
        if(league.abbreviation === ''){
            toast.warn('Name is required!', {
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
        else if(league.region === ''){
            toast.warn('Region is required!', {
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
        else if(possibleRegions.includes(league.region) === false){
            toast.warn('Region is not correct!', {
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
        else if(league.year < 2010 || league.year > 2023){
            toast.warn('Year range is wrong!', {
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
        else if(league.year === 0){
            toast.warn('Year is required!', {
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
        else if(league.bestPlayer === ''){
            toast.warn('Best Player is required!', {
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
        else if(league.audience < 0){
            toast.warn('Audience can not be a negative number!', {
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
        else if(league.description === ''){
            toast.warn('Description is required!', {
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

        try{
            const token = JSON.parse(localStorage.getItem('login')).store;


            console.log(token);
            const currentUsername = await axios.get(serverLinkUser +`/getUsername/${token}`);
            console.log(currentUsername.data);

            league.username = currentUsername.data;

            console.log(league);

            await axios.post(serverLink, league);
            navigate("/" + toAddURL +  "leagues");
        }catch(err){
            console.log(err);
            toast.error('Error occured!', {
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
                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>Description</label>
                        <input type={'text'} className='form-control' name='description' placeholder='Enter Description' value={description} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Add League</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/" + toAddURL + "leagues"}>Cancel</Link>
                    <ToastContainer />
                </form>
            </div> 
        </div>
    </div>
  )
}
