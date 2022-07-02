import React, { Component,useState } from 'react';
import axios from 'axios';
import LoadingBtn from './LoadingBtn';

const JobsCard = ({ job, userType,con_url }) => {
    const [loadingStatus,setLoadingStatus]=useState(false)
   // console.log(job)
   const onSubmitRemove=(e,jobId)=>{
    e.preventDefault()
    console.log("run")
    setLoadingStatus(true)
    const url=con_url+"jobs/"+jobId
    axios.delete(url,{}).then(res=>{
        setLoadingStatus(false)
        console.log("end")
    })
    
}
    return (

        <div className="container mx-auto mt-4 d-flex justify-content-between">
            <div className="row">
                <div className="col-md-4">
                    <div className="card" style={{ width: "18rem",position:"relative" }}>
                        {
                            loadingStatus?<LoadingBtn/>:""
                        }
                        <div className="card-body">
                            <h5 className="card-title">{job.title}</h5>
                            <p className="card-text">{job.description}</p>
                            {
                                userType.type === 'OWNER' && userType.type === 'MEMBER' ?
                                    <button type="button" className="btn  btn-primary ">Apply</button> :
                                    <button type="button" className="btn  btn-primary " onClick={(e)=>onSubmitRemove(e,job.id)}>Delete</button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default JobsCard