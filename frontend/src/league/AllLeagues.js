import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function AllLeagues() {
  
    // const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    const toAddURL = '';

    const[leagues, setLeagues] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadLeagues();
    }, []);

    const loadLeagues=async()=>{
        const result = await axios.get("http://localhost:8080/leagues");
        setLeagues(result.data);
    }
  
    const deleteLeague = async(id)=>{
        await axios.delete(`http://localhost:8080/leagues/${id}`);
        loadLeagues();
    }


    return (
    <div className='container'>
        <div className='py-4'>
            <Link className='btn btn-outline-primary mx-1' to={"/" + toAddURL + "addLeague"}>Add League</Link>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">League Name</th>
                        <th scope="col">Region</th>
                        <th scope="col">Active since</th>
                        <th scope="col">Best Player</th>
                        <th scope="col">Audience</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        leagues.map((league, index) => (
                            <tr>
                                <th scope="row" key={index}>{index + 1}</th>
                                <td>{league.abbreviation}</td>
                                <td>{league.region}</td>
                                <td>{league.year}</td>
                                <td>{league.bestPlayer}</td>
                                <td>{league.audience}</td>
                                <td>
                                    <Link className='btn btn-primary mx-1' to={`/${toAddURL}viewLeague/${league.lid}`}>View</Link>
                                    <Link className='btn btn-outline-primary mx-1' to={`/${toAddURL}updateLeague/${league.lid}`} >Edit</Link>
                                    <button className='btn btn-danger mx-1' onClick={()=>deleteLeague(league.lid)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    
                </tbody>
            </table>
        </div>
    </div>
  )
}
