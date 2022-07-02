import React, { useState } from 'react'
import axios from 'axios'
import LoadingBtn from './LoadingBtn'


const OwnerPrivillages = ({ userType, con_url, projectId }) => {
    const [loadingStatus, setLoadingStatus] = useState(false)
    const deleteProject = () => {
        let url = con_url + "projects/" + projectId
        console.log("yess")
        setLoadingStatus(true)
        axios.delete(url, {}).then(res => {
            setLoadingStatus(false)
            //console.log("res")
            window.location.href = "http://localhost:3000/";
        })
    }

    return (
        <div className="msy-member d-flex flex-column justify-content-around" style={{ position: "relative" }}>
            {
                loadingStatus ? <LoadingBtn /> : ""
            }
            <table className='mb-0' >

                <thead>
                    <tr><th>Owner Privillages</th></tr>
                </thead>
                <tbody>
                    {
                        userType.type === 'OWNER' ?
                            <>
                                <tr>
                                    <td className='text-center'>
                                        <button type="button" className="btn  btn-danger" onClick={deleteProject}>
                                            Delete Project
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-center'>
                                        <button type="button" className="btn  btn-danger" data-bs-toggle="modal" data-bs-target="#changeOwner">
                                            Change owner
                                        </button>
                                    </td>
                                </tr>
                            </> : ""
                    }
                </tbody>
            </table>


        </div>
    )
}

export default OwnerPrivillages