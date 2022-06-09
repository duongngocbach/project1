
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Login.module.css'
import Header from '../Header/Header';

function Login(){

    // fetch('http://127.0.0.1:8000/get_user', { mode: 'no-cors'})
    //     .then(res => res.text())
    //     .then(function(user_list){
    //         console.log(user_list ? JSON.parse(user_list) : {})
    //     });

    const [input_username, setUsername] = useState('')
    const [input_password, setPassword] = useState('')

    
    let navigate = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/get_user/', {
                    'username': input_username,
                    'password': input_password
                })
                .then(function(res){
                    console.log(res)
                    if (res.status == 200){
                        sessionStorage.setItem('user_info', res.data[0])
                        sessionStorage.setItem('user_group', res.data[1])
                        sessionStorage.setItem('user_permission', res.data[2])
                        navigate('/home')
                    } else{
                        alert("Tài khoản không tồn tại")
                    }
                });
    }

    return(
        <div>
            <Header />
            <form className={styles.form}>
                <h3 className={styles.formName}>Welcome!</h3>

                <label className={styles.label} htmlFor="username">Username:</label>
                <input className={styles.input} type="text" id="username" value={input_username} onChange={(e) => {setUsername(e.target.value)}} />

                <label className={styles.label} htmlFor="password">Password:</label>
                <input className={styles.input} type="password" id="password" value={input_password} onChange={(e) => {setPassword(e.target.value)}} />

                <button className={styles.button} onClick={handleLogin} > Login </button>
                <button className={styles.button} onClick={() => {navigate('/register')}}> Create Account </button> 
    
            </form>
        </div>
    )
}


export default Login;