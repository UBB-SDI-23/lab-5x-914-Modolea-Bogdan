import React, { useState } from 'react'
import axios from 'axios';
import Home from '../pages/Home';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            age: 0,
            location: '',
            verificationCode: '',
            register: false,
            store: null
        }
    }

    verifyCode = '';

    componentDidMount() {
        this.storeCollector();
    }

    storeCollector() {
        this.setState({ register: true, store: null });
    }

    async register() {
        const result = await axios.post('http://localhost:8080/user/register', this.state);
        console.log(result.data);
        this.verifyCode = result.data;
        this.state.verificationCode = result.data;
        this.storeCollector();
        console.log(this.state);
    }

    async verify() {
        console.log(this.state);
        const result = await axios.put(`http://localhost:8080/user/register/verify/${this.verifyCode}`, this.state);
        console.log(result.data);
        this.storeCollector();
        console.log(this.state);
    }

    cancel() {
        this.setState({ register: false });
    }

    render() {
        return (
            <div>
                { !this.state.register ?
                    <div>
                        <h1>Register</h1>
                        <input type='text' onChange={(event) => this.setState({ name: event.target.value })} /> <br /> <br />
                        <input type='text' onChange={(event) => this.setState({ email: event.target.value })} /> <br /> <br />
                        <input type='text' onChange={(event) => this.setState({ password: event.target.value })} /> <br /> <br />
                        <input type='text' onChange={(event) => this.setState({ age: event.target.value })} /> <br /> <br />
                        <input type='text' onChange={(event) => this.setState({ location: event.target.value })} /> <br /> <br />
                        <button onClick={() => this.register()}>Register</button>
                    </div>
                :
                <div>
                    <h1>You have 10 minutes to verify account!</h1>
                    <button className='btn btn-primary my-2' onClick={() => this.verify()}>Verify</button>
                    <button className='btn btn-primary my-2' onClick={() => this.cancel()}>Cancel</button>
                </div>
            }
            </div>
        );
    }
}

export default Register;