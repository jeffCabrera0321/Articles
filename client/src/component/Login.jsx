import React, {useEffect, useState} from 'react';
import APIServices from '../APIServices';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useCookies(['myToken']);
    const [isLogin, setLogin] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        if (token['myToken']){
            navigate('/articles/');
        }
    }, [token]);

    const loginBtn = () => {
        APIServices.LoginUser({username, password}).then(res => setToken('myToken', res.token)).catch(err => console.log(err));
    }
    const registerBtn = () => {
        APIServices.RegisterUser({username, password}).then(() => loginBtn()).catch(err => console.log(err));
    }
  return (
    <div className='App'>
        <br/>
        <br/>
        {isLogin ? <h1>Please login</h1> : <h1>Please Register</h1>}
        <br/>
        <br/>
        <div className='mb-3'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input type='text' className='form-control' id='username' placeholder='Please enter username' value={username} onChange={e =>setUsername(e.target.value)}/>
        </div>
        <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Please enter password' value={password} onChange={e =>setPassword(e.target.value)}/>
        </div>
        {isLogin ?  <button className='btn btn-primary' onClick={loginBtn}>Login</button> :
                    <button className='btn btn-primary' onClick={registerBtn}>Register</button> }
        
        <div className='mb-3'>
            <br/>
            {isLogin ? <h5>If you don't hav an account, please<button className='btn btn-primary' onClick= {() => {setLogin(false)}}>Register here</button></h5>
            : <h5>If you have an account, please<button className='btn btn-primary' onClick= {() => {setLogin(true)}}>Login</button></h5>}

        </div>
    </div>
  )
}

export default Login;