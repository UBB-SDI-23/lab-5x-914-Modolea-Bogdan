import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function AllLeagues() {
  
    // const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    const toAddURL = '';
    const serverLink = 'http://localhost:8080/leagues';
    // const serverLink = 'http://esportsleaguemanager-env.eba-tbki6djt.eu-north-1.elasticbeanstalk.com/leagues';

    const[leagues, setLeagues] = useState([]);

    const[currentPage, setCurrentPage] = useState(1);
    const[npage, setNPages] = useState(0);
    const recordsPerPage = 100;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const {id} = useParams();

    useEffect(() => {
        loadLeagues();
    }, []);

    const loadLeaguesWithPage=async(page)=>{
        const result = await axios.get(`${serverLink}/pagination/${page - 1}/${recordsPerPage}`);
        setLeagues(result.data.content);
    }

    const loadLeagues=async()=>{
        const result = await axios.get(`${serverLink}/pagination/${currentPage - 1}/${recordsPerPage}`);
        setNPages(result.data.totalPages);
        setLeagues(result.data.content);
    }
  
    const deleteLeague = async(id)=>{
        await axios.delete(serverLink + `/${id}`);
        loadLeagues();
    }


    return (
    <div className='container'>
        <div className='py-4'>
            <div className='mb-2'>
                <Link className='btn btn-outline-primary mx-1' to={"/" + toAddURL + "addLeague"}>Add League</Link>
                <Link className='btn btn-outline-primary mx-1' to={"/" + toAddURL + "statisticalReport"}>Get Statistical Report</Link>
            </div>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">League Name</th>
                        <th scope="col">Region</th>
                        <th scope="col">Active since</th>
                        <th scope="col">Best Player</th>
                        <th scope="col">Audience</th>
                        <th scope="col">Description</th>
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
                                <td>{league.description}</td>
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
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link'
                        onClick={prePage}
                        >Prev
                        </a>
                    </li>
                    {/* {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href='#' className='page-link'
                                onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    } */}
                    <li className='page-item'>
                        <a href='#' className='page-link'
                        onClick={nextPage}
                        >Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
  function prePage(){
    console.log(currentPage);
    if(currentPage > 1){
        setCurrentPage(currentPage - 1);
        loadLeaguesWithPage(currentPage - 1);
    }
  }

  function changeCPage(id) { 
    setCurrentPage(id);
    loadLeaguesWithPage(id);
  }

  function nextPage() { 
    console.log(currentPage);
    if(currentPage < npage) {
        setCurrentPage(currentPage + 1);
        loadLeaguesWithPage(currentPage + 1);
    }
  }   
}
