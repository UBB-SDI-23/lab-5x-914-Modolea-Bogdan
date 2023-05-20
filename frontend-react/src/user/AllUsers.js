import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AllUsers() {
    const serverLink = 'http://localhost:8080/user';

    const[users, setUsers] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[npage, setNPages] = useState();
    const[numbers1, setNumbers1] = useState([0, 1, 2, 3].slice(1));
    const[numbers2, setNumbers2] = useState([]);
    const recordsPerPage = 100;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const[newPages, setNewPages] = useState(0);

    const onInputChange=(e)=>{
        setNewPages(e.target.value);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsersWithPage=async(page)=>{
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

        const result = await axios.get(`${serverLink}/stats/pagination/${page - 1}/${recordsPerPage}`);
        setUsers(result.data.content);
    }

    const loadUsers=async()=>{
        console.log(serverLink);
        const result = await axios.get(`${serverLink}/stats/pagination/${currentPage - 1}/${recordsPerPage}`);
        setNPages(result.data.totalPages);
        setUsers(result.data.content);
        const lastpage = result.data.totalPages;
        setNumbers2([lastpage - 3, lastpage - 2, lastpage - 1, lastpage].slice(1));
    }

    const deleteAllData = async() => {
        console.log("delted!");
        const svLink = 'http://localhost:8080/admin';
        const result = await axios.post(`${svLink}/admin/drop-all`);
        console.log(result);
        alert("Deleted!");
    }

    const populateAll = async() => {
        console.log("populated!");
        const svLink = 'http://localhost:8080/admin';
        const resultL = await axios.post(`${svLink}/admin/populate-leagues`);
        const resultT = await axios.post(`${svLink}/admin/populate-teams`);
        const resultF = await axios.post(`${svLink}/admin/populate-fans`);
        alert("Populated!");
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        console.log(newPages);
        const svLink = 'http://localhost:8080/admin';
        const result = await axios.post(`${svLink}/admin/updatePages/${newPages}`);
        console.log(result);
        window.location.reload();
    }

    return (
        <div className='container'>
        <div className='py-4'>
            <div className='mb-2'>
                <div class="d-flex justify-content-center">
                    <div class="input-group w-auto">
                        <button onClick={deleteAllData} className='btn btn-danger my-2 me-1'>Delete All Data</button> <br></br>
                        <button onClick={populateAll} className='btn btn-primary my-2 ms-1'>Populate All Data</button> <br></br>
                    </div>
                </div>
                <label htmlFor='newPages' className='form-label'>Number Of Pages</label>
                <div class="d-flex justify-content-center">
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div class="input-group w-auto">
                            <input type={'number'} className='form-control' name='newPages' placeholder='Enter Number Of Pages' value={newPages} onChange={(e)=>onInputChange(e)}/>
                            <button type='submit' className='btn btn-outline-primary'>Update Pages for All Users</button>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">Records On Page</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map((user, index) => (
                            <tr>
                                <th scope="row" key={index}>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.roles}</td>
                                <td>{user.recordsOnPage}</td>
                                <td><Link to={`/editUser/${user.name}`}>Edit</Link></td>
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
            loadUsersWithPage(currentPage - 1);
        }
      }
    
      function changeCPage(id) { 
        if(id !== '...'){
            setCurrentPage(id);
            loadUsersWithPage(id);
        }
      }
    
      function nextPage() { 
        console.log(currentPage);
        if(currentPage < npage) {
            setCurrentPage(currentPage + 1);
            loadUsersWithPage(currentPage + 1);
        }
      }
}
