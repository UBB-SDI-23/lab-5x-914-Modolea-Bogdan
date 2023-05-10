import React, { useState } from 'react'
import axios from 'axios';
import Home from '../pages/Home';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';


// export default function Login() {

//     let navigate = useNavigate();

//     const [state, setState] = useState({
//         username: '',
//         password: '',
//         login: false,
//         store: null
//     });

//     const{username, password, login, store} = state;

//     const onInputChange=(e)=>{
//         setState({...state, [e.target.name]: e.target.value});
//     }
    
//     const componentDidMount = () => {
//         this.storeCollector();
//     }

//     const storeCollector = () => {
//         let store = JSON.parse(localStorage.getItem('login'));
//         if (store && store.login) {
//             state.login = true;
//             state.store = store;
//             // setState({ login: true, store: store });
//         }
//     }

//     const doLogin = async () => {
//         // console.log(state);
//         const result = await axios.post('http://localhost:8080/user/authenticate', state);
//         console.log(result.data);
//         localStorage.setItem('login', JSON.stringify({
//             login: true,
//             store: result.data
//         }))
//         storeCollector();
//         navigate("/");
//     }

//     const onSubmit=async(e)=>{
//         e.preventDefault();

//         doLogin();
//     };

//     const render = () => {
//         return (
//             <div>
//                 { !state.login ?
//                     <div>
//                         <h1>Login</h1>
//                         <form onSubmit={(e)=>onSubmit(e)}>
//                             <div className='mb-3'>
//                                 <label htmlFor='username' className='form-label'>Username</label>
//                                 <input type={'text'} className='form-control' name='username' placeholder='Username' value={username} onChange={(e)=>onInputChange(e)}/>
//                             </div>
//                             <div className='mb-3'>
//                                 <label htmlFor='password' className='form-label'>Password</label>
//                                 <input type={'text'} className='form-control' name='password' placeholder='Password' value={password} onChange={(e)=>onInputChange(e)}/>
//                             </div>
//                             <button type='submit' className='btn btn-outline-primary'>Login</button>
//                         </form>
//                     </div>
//                 :
//                     <Button variant="primary" onClick={() => navigate("/")}>Home</Button>
//                 }
//             </div>
//         );
//     }

//     if(!state.login){
//         return render();
//     }else{
//         navigate("/");
//     }
// }



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
                    <h1>You are already logged in</h1>
                    <Link className='btn btn-primary my-2' to={"/"}>Home</Link>
                </div>
            }
            </div>
        );
    }
}

export default Login;