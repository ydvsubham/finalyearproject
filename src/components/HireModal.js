import bgImg from '../images/hero_2.jpg'
import LoadingBtn from './LoadingBtn'
import {useState,useEffect} from 'react';
import axios from 'axios';
import React, { Component }  from 'react';



const HireModal = ({projectId,con_url}) => {
    const[jobTitle,setJobTitle]=useState("")
    const[jobDescription,setJobDescription]=useState("")
    const[loading , setLoading]=useState(false)
    const d=new Date()

    const onSubmit=(e)=>{
        e.preventDefault()
        //console.log("running")
        setLoading(true)
        const url=con_url+"jobs/"
        axios.post(url,{
            //created_at: d.getFullYear() + d.getMonth() + d.getDate(),
            title:jobTitle,
            description:jobDescription,
            status:1,
            project:con_url+"projects/"+projectId
        }).then(res=>{
            setJobTitle("")
            setJobDescription("")
            //console.log(res)
            setLoading(false)
        })
        
    }

    
    
  return (
    <div className="modal fade" id="hireFormMember" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content rounded-0">
                    <div className="modal-body bg-image overlay msy-modal-body" style={{backgroundImage :  `url(${bgImg})`} }>
                        {
                            loading ? <LoadingBtn /> : <span></span>
                        }
                        
                        <div className="line px-3 to-front">
                            <div className="row align-items-center">
                                <div className="col logo">
                                    
                                </div>
                                <div className="col-md-8 text-center">
                                    <h2>Hire</h2>
                                </div>
                                <div className="col text-right">
                                    <a href="#" className="close-btn" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"><span className="icon-close2"></span></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <section className="section  createProject pt-3" id="top" data-section="section1">
                            <form className="my-form login-box" onSubmit={onSubmit}>
                                <div className="container">
                                    <ul>
                                        <li>
                                            <div className="grid">
                                                <div className=" user-box">
                                                    <input 
                                                        type="text"  
                                                        required
                                                        value={jobTitle}
                                                        onChange={(e)=>setJobTitle(e.target.value)}
                                                    />
                                                    <label>Job Title</label>
                                                </div>
                                            
                                            </div>
                                        </li>
                                        
                                        <li>
                                            <div className=" user-box">
                                                <textarea type="email"  
                                                    required
                                                    value={jobDescription}
                                                    onChange={(e)=>setJobDescription(e.target.value)}
                                                ></textarea> 
                                                <label>Job Description</label>
                                            </div>
                                        </li>   
                                        
                                        <li className="d-flex justify-content-end create-btn bg-transparent">
                                            <button className='btn btn-prinmary add-mem float-right addmem' type='submit'>Post Job</button>
                                        </li>
                                    </ul>
                                </div>
                                

                            </form>
                            
                        </section>
                        
                    </div>

                </div>
            </div>
        </div>
  )
}

export default HireModal