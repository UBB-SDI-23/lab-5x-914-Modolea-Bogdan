import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function AllTeams() {
  
    const toAddURL = '';
    // const serverLink = 'http://localhost:8080';
    const serverLink = 'https://sdidemo.chickenkiller.com';
    
    const[teams, setTeams] = useState([]);

    const[currentPage, setCurrentPage] = useState(1);
    const[npage, setNPages] = useState(0);
    const recordsPerPage = 100;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    // const records = teams.slice(firstIndex, lastIndex);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const {id} = useParams();

    useEffect(() => {
        loadTeams();
    }, []);

    
    const loadTeamsWithPage=async(page)=>{
        const result = await axios.get(`${serverLink}/teams/pagination/${page - 1}/${recordsPerPage}`);
        setTeams(result.data.content);
    }

    const loadTeams=async()=>{
        console.log(serverLink);
        const result = await axios.get(`${serverLink}/teams/pagination/${currentPage - 1}/${recordsPerPage}`);
        setNPages(result.data.totalPages);
        setTeams(result.data.content);
    }
  
    const deleteTeam = async(id)=>{
        await axios.delete(serverLink + `/teams/${id}`);
        loadTeams();
    }




    return (
    <div className='container'>
        <div className='py-4'>
            <div className='mb-2'>
                <Link className='btn btn-outline-primary mx-1' to={"/" + toAddURL + "addTeam"}>Add Team</Link>
            </div>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Team Name</th>
                        <th scope="col">Toplaner</th>
                        <th scope="col">Jungler</th>
                        <th scope="col">Midlaner</th>
                        <th scope="col">Botlaner</th>
                        <th scope="col">Support</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        teams.map((team, index) => (
                            <tr>
                                <th scope="row" key={index}>{index + 1}</th>
                                <td>{team.name}</td>
                                <td>{team.top}</td>
                                <td>{team.jungle}</td>
                                <td>{team.mid}</td>
                                <td>{team.bot}</td>
                                <td>{team.support}</td>
                                <td>
                                    <Link className='btn btn-primary mx-1' to={`/${toAddURL}viewTeam/${team.tid}`}>View</Link>
                                    <Link className='btn btn-outline-primary mx-1' to={`/${toAddURL}updateTeam/${team.tid}`} >Edit</Link>
                                    <button className='btn btn-danger mx-1' onClick={()=>deleteTeam(team.tid)}>Delete</button>
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

  function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function prePage(){
    console.log(currentPage);
    if(currentPage > 1){
        setCurrentPage(currentPage - 1);
        loadTeamsWithPage(currentPage - 1);
    }
  }

  function changeCPage(id) { 
    setCurrentPage(id);
    loadTeamsWithPage(id);
  }

  function nextPage() { 
    console.log(currentPage);
    if(currentPage < npage) {
        setCurrentPage(currentPage + 1);
        loadTeamsWithPage(currentPage + 1);
    }
  }
}
