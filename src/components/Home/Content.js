import React, {useState, useEffect} from 'react'
import styles from './Content.module.css'
import ReactPaginate from 'react-paginate'
import 'antd/dist/antd.css'
import { Modal } from 'antd'
import {CaretUpFilled, CaretDownOutlined, SearchOutlined} from '@ant-design/icons'
import axios from 'axios'
import AddPost from './AddPost'
import ChangePost from './ChangePost'
import Header from '../Header/Header'


function Content() {

    const user_permission = sessionStorage.getItem('user_permission').split(',')

    const [showAddForm, setShowAddForm] = useState(false)
    const [showChangeForm, setShowChangeForm] = useState(false)
    const [updateData, setUpdateData] = useState()
    const [showDelete, setShowDelete] = useState(false)
    const [deleteData, setDeleteData] = useState()
    const [titleSort, setTitleSort] = useState()
    const [typeSort, setTypeSort] = useState()
    const [dataSearch, setDataSearch] = useState()
    const [dataSearchType, setDataSearchType] = useState()


    const [post, setPost] = useState([])
    const [number, setNumber] = useState(0)
    const postPerPage = 100

    useEffect(() => {
        const getData = () => {
            axios.get('http://127.0.0.1:8000/get_content/', {
                headers: {
                    'accept': 'application/json',
                }
            })
                .then(function(record){
                    setPost(record.data)   
            });
        }
        getData()
      }, [])

    // Pagination
    const lastPost = number * postPerPage;
    const currentPost = post.slice(lastPost, lastPost + postPerPage )
    const PageCount = Math.ceil(post.length / postPerPage)
    const ChangePage = ({ selected }) => {
        setNumber(selected)
    };

    const showModal = () => {
        setShowAddForm(true)
    };
    const handleCancel = () => {
        setShowAddForm(false)
        setShowDelete(false)
        setShowChangeForm(false)
    };

    const handleChange=(data) => {
        // console.log(data)
        setShowChangeForm(true)
        setUpdateData(data)
    }

    const handleDelete = (id_data) => {
        setShowDelete(true)
        setDeleteData(id_data)
    }
    
    const confirmDelete = (deleteData) => {
        axios.post('http://127.0.0.1:8000/delete_content/', {'data': deleteData})
        window.location.reload(false)
    }

    useEffect(()=>{
        axios.post('http://127.0.0.1:8000/sort_content/', {'titleSort': titleSort, 'typeSort': typeSort})
        .then(function(record){
            setPost(record.data)   
        });
    },[titleSort, typeSort])

    useEffect(()=>{
        axios.post('http://127.0.0.1:8000/search_content/', {'dataSearch': dataSearch, 'dataSearchType': dataSearchType})
        .then(function(record){
            setPost(record.data)   
        });
    },[dataSearch])

    return(
        <div>
            <Header />
            <div className={styles.AddSearch}>
                <div className={styles.AddDiv}>
                    {(user_permission.includes("home.add_content"))
                        ? <button className={styles.buttonAdd} onClick={showModal} > Add Post </button>
                        : null
                    }
                </div>
                <div className={styles.SearchDiv}>
                    <input className={styles.SearchInput} type='text' placeholder='Search...' value={dataSearch} onChange={(e) => {setDataSearch(e.target.value)}}/>
                    <select className={styles.SearchSelect} value={dataSearchType} onChange={(e) => {setDataSearchType(e.target.value)}}>
                        <option>---</option>
                        <option value='id'>ID</option>
                        <option value='ip'>IP</option>
                        <option value='hostname'>Hostname</option>
                        <option value='total_mac'>Total mac</option>
                        <option value='number_of_pop_tail'>Number of pop tail</option>
                    </select>
                    <SearchOutlined className={styles.SearchIcon} />
                </div>
            </div>
            <Modal visible={showAddForm} title="Thêm dữ liệu" style={{top:20}} bodyStyle={{height: 550}} onCancel={handleCancel} onOk={()=>{window.location.reload(false)}}>
                <AddPost />    
            </Modal>

            <Modal visible={showChangeForm} title="Cập nhật dữ liệu" style={{top:20}} bodyStyle={{height: 550}} onCancel={handleCancel} onOk={()=>{window.location.reload(false)}}>
                <ChangePost data={updateData}/>    
            </Modal>

            <Modal visible={showDelete} title="Confirm!" onCancel={handleCancel} onOk={()=>confirmDelete(deleteData)}>
                <p>Bạn có muốn xóa dữ liệu này?</p>    
            </Modal>

            <div className={styles.Table}>
                <table>
                    <tbody>
                        <tr>
                            <th>Id <CaretUpFilled onClick={()=>(setTitleSort('id')&setTypeSort('up'))}/><CaretDownOutlined onClick={()=>(setTitleSort('id') & setTypeSort('down'))}/></th>
                            <th>Ip</th>
                            <th>Hostname</th>
                            <th>Branch</th>
                            <th>Zone</th>
                            <th>Pop</th>
                            <th>Type</th>
                            <th>Function</th>
                            <th>Model</th>
                            <th>Province</th>
                            <th>Total_mac <CaretUpFilled onClick={()=>(setTitleSort('total_mac') & setTypeSort('up'))}/><CaretDownOutlined onClick={()=>(setTitleSort('total_mac') & setTypeSort('down'))}/></th>
                            {/* <th>Smart_link</th>
                            <th>Sep</th>
                            <th>Stack</th> */}
                            <th>Number_of_pop_tail <CaretUpFilled onClick={()=>(setTitleSort('number_of_pop_tail') & setTypeSort('up'))}/><CaretDownOutlined onClick={()=>(setTitleSort('number_of_pop_tail') & setTypeSort('down'))}/></th>
                            <th>Patch_ver</th>
                            <th>Patch_state</th>
                            <th>Software ver</th>
                            <th>Switch_type</th>
                            {(user_permission.includes("home.change_content"))
                                ?<th>Change</th>:null
                            }
                            {(user_permission.includes("home.delete_content"))
                                ?<th>Delete</th>:null
                            }
                        </tr>
                    </tbody>

                    {currentPost.map(data => (
                        <tbody key={data.id}>
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.ip}</td>
                                <td>{data.hostname}</td>
                                <td>{data.branch}</td>
                                <td>{data.zone}</td>
                                <td>{data.pop}</td>
                                <td>{data.type}</td>
                                <td>{data.function}</td>
                                <td>{data.model}</td>
                                <td>{data.province}</td>
                                <td>{data.total_mac}</td>
                                {/* <td>{data.smart_link.toString()}</td>
                                <td>{data.sep.toString()}</td>
                                <td>{data.stack.toString()}</td> */}
                                <td>{data.number_of_pop_tail}</td>
                                <td>{data.patch_ver}</td>
                                <td>{data.patch_state}</td>
                                <td>{data.software_ver}</td>
                                <td>{data.switch_type}</td>
                                {(user_permission.includes("home.change_content"))
                                    ?<td><button className={styles.buttonChange} onClick={()=>handleChange(data)}> Change </button></td> 
                                    : null
                                }
                                {(user_permission.includes("home.delete_content"))
                                    ? <td><button className={styles.buttonChange} onClick={()=>handleDelete(data.id)}> Delete </button></td>
                                    :null
                                }      
                            </tr>
                        </tbody>
                    ))}
                </table>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={PageCount}
                    onPageChange={ChangePage}
                    containerClassName={styles.navigationButtons}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={styles.navigationDisabled}
                    activeClassName={styles.navigationActive}
                ></ReactPaginate>
            </div>
        </div>
    )
}

export default Content;