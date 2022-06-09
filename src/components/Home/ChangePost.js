import {useLocation, useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from 'axios'
import styles from './AddPost.module.css'

function ChangePost({data}) {

    // const location = useLocation()
    // const update_data = data //location.state
    
    const [input, setInput] = useState(data)
    useEffect(()=>{setInput(data)},[data])
    
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInput(values => ({...values, [name]: value}))
    }

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:8000/update_content/', {'data': input})
            .then(function(res){
                if (res.status == 200){
                    alert("Cập nhật dữ liệu thành công")
                } else{
                    alert("Cập nhật dữ liệu thất bại. Nhập lại")
                }
            });
    }

    return(
        <div>
            <form className={styles.addForm}>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='ip'>Ip:</label>
                    <input className={styles.input} type='text' name='ip' id='ip' value={input.ip} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='hostname'>Hostname:</label>
                    <input type='text' className={styles.input} name='hostname' id='hostname' value={input.hostname} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='branch'>Branch:</label>
                    <input type='text' className={styles.input} name='branch' id='branch' value={input.branch} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='zone'>Zone:</label>
                    <input type='number' className={styles.input} name='zone' id='zone' value={input.zone} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='pop'>Pop:</label>
                    <input type='text' className={styles.input} name='pop' id='pop' value={input.pop} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='type'>Type:</label>
                    <input type='text' className={styles.input} name='type' id='type' value={input.type} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='function'>Function:</label>
                    <input type='text' className={styles.input} name='function' id='function' value={input.function} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='model'>Model:</label>
                    <input type='text' className={styles.input} name='model' id='model' value={input.model} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='province'>Province:</label>
                    <input type='text' className={styles.input} name='province' id='province' value={input.province} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='total_mac'>Total mac:</label>
                    <input type='number' className={styles.input} name='total_mac' id='total_mac' value={input.total_mac } onChange={handleChange} />
                </div><br/>
                {/* <div className={styles.row}>
                    <label className={styles.label} htmlFor='smart_link'>Smart link:</label>
                    <input type='checkbox' className={styles.input} name='smart_link' id='smart_link' value={input.smart_link} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='sep'>Sep:</label>
                    <input type='checkbox' className={styles.input} name='sep' id='sep' value={input.sep} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='stack'>Stack:</label>
                    <input type='checkbox' className={styles.input} name='stack' id='stack' value={input.stack} onChange={handleChange} />
                </div><br/> */}
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='number_of_pop_tail'>Number of pop tail:</label>
                    <input type='number' className={styles.input} name='number_of_pop_tail' id='number_of_pop_tail' value={input.number_of_pop_tail} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='patch_ver'>Patch ver:</label>
                    <input type='text' className={styles.input} name='patch_ver' id='patch_ver' value={input.patch_ver} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='patch_state'>Patch state:</label>
                    <input type='text' className={styles.input} name='patch_state' id='patch_state' value={input.patch_state} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='software_ver'>Software ver:</label>
                    <input type='text' className={styles.input} name='software_ver' id='software_ver' value={input.software_ver} onChange={handleChange} />
                </div><br/>
                <div className={styles.row}>
                    <label className={styles.label} htmlFor='switch_type'>Switch type:</label>
                    <input type='text' className={styles.input} name='switch_type' id='switch_type' value={input.switch_type} onChange={handleChange} />
                </div><br/>
                <div>
                    <button className={styles.button} onClick={handleSubmit} > Update data </button>
                </div>
            </form>
        </div>
    )
}


export default ChangePost;