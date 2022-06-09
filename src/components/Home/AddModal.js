import {useState} from 'react'
import axios from 'axios';
import styles from './AddPost.module.css'
import 'antd/dist/antd.css'
import { Modal } from 'antd'

export default function AddModal() {

    return(
        <Modal visible={showAddForm} title="Thêm dữ liệu" bodyStyle={{height: 550}} onCancel={handleCancel} onOk={()=>{window.location.reload(false)}}>
                 
        </Modal>
    )
}