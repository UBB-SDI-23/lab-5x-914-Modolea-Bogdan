import React, { useState } from 'react'
import axios from 'axios';
import Home from '../pages/Home';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            login: false,
            store: null
        }
    }

    componentDidMount() {
        this.storeCollector();
    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'));
        if (store && store.login) {
            this.setState({ login: true, store: store });
        }
    }

    async login() {
        if(this.state.username === '') {
            toast.warn('The username must not be left empty', {
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
        else if(this.state.password === '') {
            toast.warn('The password must not be left empty!', {
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
            const result = await axios.post('http://localhost:8080/user/authenticate', this.state);
            console.log(result.data);
            localStorage.setItem('login', JSON.stringify({
                login: true,
                store: result.data
            }))
            this.storeCollector();
            console.log(this.state);
        }
        catch (error) {
            toast.warn('Something went wrong! Try again!', {
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
    }

    render() {
        return (
            <div>
                { !this.state.login ?
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                        <h2 className='text-center m-4'>Login</h2>
                        <div className='mb-3'>
                            <label className='form-label'>Username</label>
                            <input className='form-control' placeholder='Enter Username' type='text' onChange={(event) => this.setState({ username: event.target.value })} /> <br /> <br />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Password</label>
                            <input className='form-control' placeholder='Enter Password' type='password' onChange={(event) => this.setState({ password: event.target.value })} /> <br /> <br />
                        </div>
                        <button className='btn btn-outline-primary' onClick={() => this.login()}>Login</button>
                        <ToastContainer />
                    </div>
                :
                <div>
                    <h1>You are logged in!</h1>
                    <Link className='btn btn-primary my-2' to={"/"}>Home</Link>
                </div>
            }
            </div>
        );
    }
}

export default Login;