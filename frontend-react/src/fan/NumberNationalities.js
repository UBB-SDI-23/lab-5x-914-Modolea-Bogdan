import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function NumberNationalities() {
  
    // const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    const toAddURL = '';
    const serverLink = 'http://localhost:8080/fans';
    // const serverLink = 'https://sdidemo.chickenkiller.com/leagues';

    const[raports, setRaport] = useState([]);

    const[currentPage, setCurrentPage] = useState(1);
    const[npage, setNPages] = useState(0);
    const[numbers, setNumbers] = useState([]);
    const recordsPerPage = 50;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;


    useEffect(() => {
        loadRaport();
    }, []);

    const loadRaportWithPage=async(page)=>{
        const result = await axios.get(`${serverLink}/numberNations/pagination/${page - 1}/${recordsPerPage}`);
        setRaport(result.data.content);

        
    }

    const loadRaport=async()=>{
        const result = await axios.get(serverLink + `/numberNations/pagination/${currentPage - 1}/${recordsPerPage}`);
        setNPages(result.data.totalPages);
        setRaport(result.data.content);
        const lastpage = result.data.totalPages;
        setNumbers([...Array(lastpage + 1).keys()].slice(1));
    }

    return (
    <div className='container'>
        <div className='py-4'>
            <div className='mb-2'>
            <Link className='btn btn-outline-danger mx-1' to={"/" + toAddURL + "fans"}>Back</Link>
            </div>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Counter</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        raports.map((raport, index) => (
                            <tr>
                                <th scope="row" key={index}>{index + 1}</th>
                                <td>{raport.nationality}</td>
                                <td>{raport.counter}</td>
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
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n && n != '...' ? 'active' : ''}`} key={i}>
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
        loadRaportWithPage(currentPage - 1);
    }
  }

  function changeCPage(id) { 
    if(id !== '...'){
        setCurrentPage(id);
        loadRaportWithPage(id);
    }
  }

  function nextPage() { 
    console.log(currentPage);
    console.log(numbers);
    if(currentPage < npage) {
        setCurrentPage(currentPage + 1);
        loadRaportWithPage(currentPage + 1);
    }
  }
}
