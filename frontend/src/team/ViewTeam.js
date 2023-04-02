import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewTeam() {
    const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    // const toAddURL = '';

    const [team, setTeam] = useState({
        name: '',
        top: '',
        jungle: '',
        mid: '',
        bot: '',
        support: ''
    });

    const {id} = useParams();

    useEffect(() => {
        loadTeam();
    }, []);

    const loadTeam = async()=>{
        const result = await axios.get(`http://localhost:8080/team/${id}`);
        setTeam(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Team Details</h2>
                <div className='card'>
                    <div className='card-header'>
                        Team details:
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'><b>Team Name: {team.name}</b></li>
                            <li className='list-group-item'><b>Toplaner: {team.top}</b></li>
                            <li className='list-group-item'><b>Jungler: {team.jungle}</b></li>
                            <li className='list-group-item'><b>Midlaner: {team.mid}</b></li>
                            <li className='list-group-item'><b>Botlaner: {team.bot}</b></li>
                            <li className='list-group-item'><b>Support: {team.support}</b></li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/" + toAddURL + "teams"}>Back</Link>
            </div>
        </div>
    </div>
  )
}
