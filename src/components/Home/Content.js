import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Content.module.css'
import ReactPaginate from 'react-paginate'
import 'antd/dist/antd.css'
import { Modal } from 'antd'
import {CaretUpFilled, CaretDownOutlined} from '@ant-design/icons'
import axios from 'axios'
import AddPost from './AddPost'
import ChangePost from './ChangePost'


function Content() {

    const user_permission = sessionStorage.getItem('user_permission').split(',')

    const navigate = useNavigate()

    const [showAddForm, setShowAddForm] = useState(false);
    const [showChangeForm, setShowChangeForm] = useState(false);
    const [updateData, setUpdateData] = useState();
    const [showDelete, setShowDelete] = useState(false);
    const [deleteData, setDeleteData] = useState();

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
        console.log(data)
        setUpdateData(data)
        setShowChangeForm(true)
    }

    const handleDelete = (id_data) => {
        setShowDelete(true)
        setDeleteData(id_data)
    }
    
    const confirmDelete = (deleteData) => {
        axios.post('http://127.0.0.1:8000/delete_content/', {'data': deleteData})
        window.location.reload(false)
    }

    return(
        <div>
            <div className={styles.AddDiv}>
                {(user_permission.includes("home.add_content"))
                    ? <button className={styles.buttonAdd} onClick={showModal} > Add Post </button>
                    : null
                }
            </div>
            <Modal visible={showAddForm} title="Thêm dữ liệu" bodyStyle={{height: 550}} onCancel={handleCancel} onOk={()=>{window.location.reload(false)}}>
                <AddPost />    
            </Modal>

            <Modal visible={showChangeForm} title="Cập nhật dữ liệu" bodyStyle={{height: 550}} onCancel={handleCancel} onOk={()=>{window.location.reload(false)}}>
                <ChangePost data={updateData}/>    
            </Modal>

            <Modal visible={showDelete} title="Confirm!" onCancel={handleCancel} onOk={()=>confirmDelete(deleteData)}>
                <p>Bạn có muốn xóa dữ liệu này?</p>    
            </Modal>

            <div className={styles.Table}>
                <table>
                    <tbody>
                        <tr>
                            <th>Id <CaretUpFilled/><CaretDownOutlined/></th>
                            <th>Ip</th>
                            <th>Hostname</th>
                            <th>Branch</th>
                            <th>Zone</th>
                            <th>Pop</th>
                            <th>Type</th>
                            <th>Function</th>
                            <th>Model</th>
                            <th>Province</th>
                            <th>Total_mac <CaretUpFilled/><CaretDownOutlined/></th>
                            {/* <th>Smart_link</th>
                            <th>Sep</th>
                            <th>Stack</th> */}
                            <th>Number_of_pop_tail <CaretUpFilled/><CaretDownOutlined/></th>
                            <th>Patch_ver</th>
                            <th>Patch_state</th>
                            <th>Software ver</th>
                            <th>Switch_type</th>
                            <th>Change</th>
                            <th>Delete</th>
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