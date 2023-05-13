import React, { useState } from 'react'
import axios from 'axios';
import Home from '../pages/Home';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
        const result = await axios.post('http://localhost:8080/user/authenticate', this.state);
        console.log(result.data);
        localStorage.setItem('login', JSON.stringify({
            login: true,
            store: result.data
        }))
        this.storeCollector();
        console.log(this.state);
    }

    render() {
        return (
            <div>
                { !this.state.login ?
                    <div>
                        <h1>Login</h1>
                        <input type='text' onChange={(event) => this.setState({ username: event.target.value })} /> <br /> <br />
                        <input type='text' onChange={(event) => this.setState({ password: event.target.value })} /> <br /> <br />
                        <button onClick={() => this.login()}>Login</button>
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