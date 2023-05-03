import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


export default function AllFans() {
  
    // const toAddURL = 'lab-5x-914-Modolea-Bogdan/';
    const toAddURL = '';
    // const serverLink = 'http://localhost:8080/fans';
    const serverLink = 'https://sdidemo.chickenkiller.com/fans';

    let navigate = useNavigate();

    const[fans, setFans] = useState([]);
    const {id} = useParams();

    const[currentPage, setCurrentPage] = useState(1);
    const[npage, setNPages] = useState(0);
    const recordsPerPage = 100;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    useEffect(() => {
        loadFans();
    }, []);

    const loadFansWithPage=async(page)=>{
        const result = await axios.get(`${serverLink}/pagination/${page - 1}/${recordsPerPage}`);
        setFans(result.data.content);
    }

    const loadFans=async()=>{
        const result = await axios.get(`${serverLink}/pagination/${currentPage - 1}/${recordsPerPage}`);
        setNPages(result.data.totalPages);
        setFans(result.data.content);
    }
  
    const deleteFan = async(id)=>{
        await axios.delete(serverLink + `/${id}`);
        loadFans();
    }

    const [fanAge, setFanAge] = useState(0);

    const {age} = fanAge;

    const onInputChange=(e)=>{
        setFanAge({...fanAge, [e.target.name]: e.target.value});
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        console.log(age);
        // navigate("/" + toAddURL +  "filterFans/" + age);
      };

    return (
    <div className='container'>
        <div className='py-4'>
            <div className='py-2'>
                <Link className='btn btn-outline-primary mx-1' to={"/" + toAddURL + "addFan"}>Add Fan</Link>
            </div>
            <div className='py-2'>
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div class="d-flex justify-content-center">
                        <div class="input-group w-auto">
                            <input type={'number'} className='form-control' name='age' placeholder='Enter Fan Age' value={age} onChange={(e)=>onInputChange(e)}/>
                            {/* <button type='submit' className='btn btn-outline-primary'>Filter Fans</button> */}
                            <Link type='submit' className='btn btn-primary mx-1' to={`/${toAddURL}filterFans/${age}`}>Filter Fans</Link>
                        </div>
                    </div>
                </form>
            </div>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Occupation</th>
                        <th scope="col">Place Of Birth</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        fans.map((fan, index) => (
                            <tr>
                                <th scope="row" key={index}>{index + 1}</th>
                                <td>{fan.name}</td>
                                <td>{fan.age}</td>
                                <td>{fan.nationality}</td>
                                <td>{fan.occupation}</td>
                                <td>{fan.placeOfBirth}</td>
                                <td>
                                    <Link className='btn btn-primary mx-1' to={`/${toAddURL}viewFan/${fan.fid}`}>View</Link>
                                    <Link className='btn btn-outline-primary mx-1' to={`/${toAddURL}updateFan/${fan.fid}`} >Edit</Link>
                                    <button className='btn btn-danger mx-1' onClick={()=>deleteFan(fan.fid)}>Delete</button>
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
        loadFansWithPage(currentPage - 1);
    }
  }

  function changeCPage(id) { 
    setCurrentPage(id);
    loadFansWithPage(id);
  }

  function nextPage() { 
    console.log(currentPage);
    if(currentPage < npage) {
        setCurrentPage(currentPage + 1);
        loadFansWithPage(currentPage + 1);
    }
  }   
}