import React from 'react'
import JobsCard from './JobsCard'
import {useState,useEffect} from 'react';
import axios from 'axios';
const JobsContainer = ({jobs,userType,con_url}) => {
  //console.log(projectId)
    // const[jobs,setJobs]=useState([])
    // useEffect(() => {
    //     const url=con_url+"jobs/"+projectId;
    //     axios.get(url).then(response=>{
    //       setJobs(response.data)
    //       console.log(response)
    //     })
       
    //   },[jobs])
    //   console.log(jobs)
  return (
    <div className="row msy-jobs-cards">
        <div className="col-12 p-0">
            <div className="msy-timeline-head ">
                <h2 className="text-center">Jobs</h2>
            </div>
            <div className='d-flex justify-content-between '>{
            jobs.length ? jobs.map((job)=>(
                <JobsCard job={job} userType={userType} con_url={con_url}/>
            )) :<h3 className='p-5 text-center d-flex justify-content-center w-100'>No jobs Available</h3>}</div>
            
            </div>
    </div>
  )
}

export default JobsContainer