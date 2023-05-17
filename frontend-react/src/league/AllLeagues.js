import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function AllLeagues() {
  
    // const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    const toAddURL = '';
    const serverLink = 'http://localhost:8080/leagues';
    // const serverLink = 'https://sdidemo.chickenkiller.com/leagues';

    const[leagues, setLeagues] = useState([]);

    const[currentPage, setCurrentPage] = useState(1);
    const[npage, setNPages] = useState(0);
    const[numbers1, setNumbers1] = useState([0, 1, 2, 3].slice(1));
    const[numbers2, setNumbers2] = useState([]);
    const[recordsPerPage, setRecordsPerPage] = useState(100);
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const {id} = useParams();

    useEffect(() => {
        loadPages();
        // loadLeagues();
    }, []);

    const loadLeaguesWithPage=async(page, recordsPage)=>{
        if(page === 1){
            setNumbers1([0, 1, 2, 3].slice(1));
            setNumbers2([npage - 3, npage - 2, npage - 1, npage].slice(1));
        }else if(page === 2){
            setNumbers1([0, 1, 2, 3, 4].slice(1));
            setNumbers2([npage - 3, npage - 2, npage - 1, npage].slice(1));
        }else if(page === 3){
            setNumbers1([0, 1, 2, 3, 4, 5].slice(1));
            setNumbers2([npage - 3, npage - 2, npage - 1, npage].slice(1));
        }else if(page === 4){
            setNumbers1([0, 1, 2, 3, 4, 5, 6].slice(1));
            setNumbers2([npage - 3, npage - 2, npage - 1, npage].slice(1));
        }else if(page === npage){
            setNumbers1([0, 1, 2, 3].slice(1));
            setNumbers2([npage - 2, npage - 1, npage].slice(1));
        }else if(page === npage - 1){
            setNumbers1([0, 1, 2, 3].slice(1));
            setNumbers2([page - 3, page - 2, page - 1, page, page + 1].slice(1));
        }else if(page === npage - 2){
            setNumbers1([0, 1, 2, 3].slice(1));
            setNumbers2([page - 3, page - 2, page - 1, page, page + 1, page + 2].slice(1));
        }else if(page === npage - 3){
            setNumbers1([0, 1, 2, 3].slice(1));
            setNumbers2([page - 3, page - 2, page - 1, page, page + 1, page + 2].slice(1));
        }else if(page == npage - 4){
            setNumbers1([0, 1, 2, 3].slice(1));
            setNumbers2([page - 3, page - 2, page - 1, page, page + 1, page + 2, page + 3, page + 4].slice(1));
        }
        else{
            setNumbers1([0, 1, 2, 3, '...', page - 2, page - 1, page, page + 1, page + 2].slice(1));
            setNumbers2([npage - 3, npage - 2, npage - 1, npage].slice(1));
        }

        const result = await axios.get(`${serverLink}/stats/pagination/${page - 1}/${recordsPage}`);
        setLeagues(result.data.content);
        setNPages(result.data.totalPages);
        const lastpage = result.data.totalPages;
        setNumbers2([lastpage - 3, lastpage - 2, lastpage - 1, lastpage].slice(1));
    }

    const loadPages=async()=>{
        const token = JSON.parse(localStorage.getItem('login'));
        if(token !== null) {
            const svLink = 'http://localhost:8080';
            const user = await axios.get(`${svLink}/user/getUsername/${token.store}`);
            const pages = await axios.get(`${svLink}/user/${user.data}`);
            setRecordsPerPage(pages.data.recordsOnPage);
            loadLeaguesWithPage(currentPage, pages.data.recordsOnPage);
        }
        else {
            setRecordsPerPage(100);
            loadLeaguesWithPage(currentPage, 100);
        }
    }   

    const loadLeagues=async()=>{
        const result = await axios.get(`${serverLink}/stats/pagination/${currentPage - 1}/${recordsPerPage}`);
        setNPages(result.data.totalPages);
        setLeagues(result.data.content);
        const lastpage = result.data.totalPages;
        setNumbers2([lastpage - 3, lastpage - 2, lastpage - 1, lastpage].slice(1));
    }
  
    const deleteLeague = async(id)=>{
        const token = JSON.parse(localStorage.getItem('login')).store;
        await axios.delete(serverLink + `/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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
                        <th scope="col">Number of Teams</th>
                        <th scope="col">Added by</th>
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
                                <td>{league.counter}</td>
                                <td><Link to={`/user/${league.username}`}>{league.username}</Link></td>
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
                    {
                        numbers1.map((n, i) => (
                            <li className={`page-item ${currentPage === n && n != '...' ? 'active' : ''}`} key={i}>
                                <a href='#' className='page-link'
                                onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }

                    <li className='page-item'>
                        <a href='#' className='page-link'>...</a>
                    </li>
                    
                    {   
                        numbers2.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href='#' className='page-link'
                                onClick={() => changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
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
        loadLeaguesWithPage(currentPage - 1, recordsPerPage);
    }
  }

  function changeCPage(id) { 
    if(id !== '...'){
        setCurrentPage(id);
        loadLeaguesWithPage(id, recordsPerPage);
    }
  }

  function nextPage() { 
    console.log(currentPage);
    if(currentPage < npage) {
        setCurrentPage(currentPage + 1);
        loadLeaguesWithPage(currentPage + 1, recordsPerPage);
    }
  }   
}
