
import { useEffect } from 'react'
import styles from './Header.module.css'

export default function Header(){

    const userInfo = sessionStorage.getItem('user_info')
    const userGroup = sessionStorage.getItem('user_group')
    useEffect(()=>{},[userInfo, userGroup])
    
    const handleLogout = () => {
        sessionStorage.clear()
    }

    return(
        <header className={styles.Header}>
            <div className={styles.Div1} >
                <nav>
                    <a href='/home' className={styles.Nav}>Home</a> |
                    <a  href='/content' className={styles.Nav}>Content</a>
                </nav>
            </div>
            <div className={styles.Div2} >
                <nav>
                    {(userInfo)
                        ?<span className={styles.Name} >{userInfo} - {userGroup}</span>
                        :<a href='/login' className={styles.Nav}>Login</a>
                    }
                    |
                    <a href='/home' onClick={handleLogout} className={styles.Nav}>Logout</a>
                </nav>
            </div>
        </header>
    )
}