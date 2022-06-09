import Header from "../Header/Header";

function Home(){

    const userInfo = sessionStorage.getItem('user_info')

    return(
        <>
        <Header />
        <div style={{marginTop:100}}>
            <h1>Welcome to my Website</h1>
            {userInfo?
                <h2 style={{color: 'red'}}>Đăng nhập thành công</h2> 
                : <h2 style={{color: 'red'}}>Bạn chưa đăng nhập. Đăng nhập để xem nội dung!</h2>
            }
        </div>
        </>
    )
}

export default Home;