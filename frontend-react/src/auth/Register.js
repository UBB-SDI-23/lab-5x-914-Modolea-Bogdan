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
            confirmationCodeSentAt: null,
            register: null
        }
    }

    verifyCode = '';

    componentDidMount() {
        this.storeCollector();
    }

    storeCollector() {
        let register = JSON.parse(localStorage.getItem('register'));
        if (register) {
            this.setState({ register: true });
        }
    }

    async register() {
        const result = await axios.post('http://localhost:8080/user/register', this.state);
        console.log(result);
        this.verifyCode = result.data.code;
        this.state.verificationCode = result.data.code;
        this.state.confirmationCodeSentAt = result.data.registerAt;

        localStorage.setItem('register', JSON.stringify({
            state: this.state,
            register: false
        }))

        this.storeCollector();
        //console.log(this.state);
    }

    async verify() {
        this.state = JSON.parse(localStorage.getItem('register')).state;
        console.log(this.state);
        console.log(this.state.verificationCode);
        const result = await axios.put(`http://localhost:8080/user/register/verify/${this.state.verificationCode}`, this.state);
        //console.log(result.data);

        localStorage.setItem('register', JSON.stringify({
            register: true
        }))

        this.storeCollector();
        window.location.href = '/';
        //console.log(this.state);
    }

    cancel() {
        localStorage.clear();
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