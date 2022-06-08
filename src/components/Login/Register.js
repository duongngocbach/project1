import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import axios from 'axios';
import styles from './Login.module.css'

function Register(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [group, setGroup] = useState('')
    
    let navigate = useNavigate();
    const handleRegister = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/register/', {
                    'username': username,
                    'password': password,
                    'email': email,
                    'group': group
                })
                .then(function(res){
                    console.log(res)
                    if (res.status == 200){
                        alert("Đăng ký tài khoản thành công")
                    } else{
                        alert("Đăng ký tài khoản thất bại")
                    }
                });
    }

    return(
        <div>
            <form className={styles.form}>
                <h3 className={styles.formName}>Register</h3>

                <label className={styles.label} for="username">Username:</label>
                <input className={styles.input} type="text" id="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />

                <label className={styles.label} for="password">Password:</label>
                <input className={styles.input} type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />

                <label className={styles.label} for="email">Email:</label>
                <input className={styles.input} type="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />

                <label className={styles.label} >Choose Group:   
                    <select value={group} onChange={(e) => {setGroup(e.target.value)}}>
                        <option>---</option>
                        <option value='KTHT'>KTHT</option>
                        <option value='CNT'>CNT</option>
                    </select>
                </label>

                <button className={styles.button} onClick={handleRegister}>Register</button> 
                <button className={styles.button} onClick={() => {navigate('/login')}} >Back to Login</button>
            </form>
        </div>
    )
}


export default Register;