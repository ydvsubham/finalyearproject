import '../css/create_project.css'
import { useState, useRef } from 'react';
import axios from 'axios';
import React, { Component } from 'react';
import LoadingBtn from './LoadingBtn';
import 'bootstrap-icons/font/bootstrap-icons.css';


const CreateProject = ({ con_url }) => {
    const [projectName, setProjectName] = useState('')
    const [tech, setTech] = useState([''])
    const [membersEmail, setMembersEmail] = useState([{ id: 1, }])
    const [descrip, setDescrip] = useState('')
    const [img, setImg] = useState('')
    const [projectCreatedOrNot, setProjectCreatedOrNot] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const timeOut = useRef(null);

    const handleImageIamge = (e) => {
        const p_img = e.target.files[0]
        const img_name = p_img.name
        setImg(img_name)

    }
    const d = new Date()
    const onSubmit = (e) => {
        e.preventDefault()
        setLoadingStatus(true)
        const url = con_url + "projects"
        console.log(url)
        axios.post(url, {
            name: projectName,
            description: descrip,
            createdAt: d.getFullYear() + d.getMonth() + d.getDate(),
            status: 1,
            hash: "hash",
            image: img,
            owner: con_url + "users/" + JSON.parse(localStorage.getItem('auth')).id

        }).then(res => {
            setProjectCreatedOrNot(true)
            setProjectName("")
            setDescrip("")
            setLoadingStatus(false)
            clearTimeout(timeOut.current)
            timeOut.current = setTimeout(() => {
                setProjectCreatedOrNot(false)
            }, 5000);
            
        })
    }


    // let handelMember =(e,i)=>{
    //     let tempMember=membersEmail
    //     tempMember[i]=e.target.value
    //     setMembersEmail([...tempMember])
    // }
    // let handeltech =(e,i)=>{
    //     let temptech=tech
    //     temptech[i]=e.target.value
    //     setTech([...temptech])
    // }
    return (
        <section className="section msy-main createProject" id="top" data-section="section1">
           
                <form className="my-form login-box" onSubmit={onSubmit}>
                {loadingStatus ? <LoadingBtn /> :<span></span>}
                    <div className="container p-5">
                    <div className={projectCreatedOrNot ? 'd-block' : 'd-none'}><h2 className='text-success d-flex align-center justify-content-center'><i class="bi bi-emoji-smile px-2"></i>Project Created</h2></div>

                        <h2>Create Project</h2>
                        <ul>
                            <li>
                                <div className="grid grid-2">
                                    <div className=" user-box">
                                        <input type="text"
                                            required
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)} />
                                        <label>Project Name</label>
                                    </div>
                                    <div className=" user-box">
                                        <input type="file"
                                            className='custom-file-input'
                                            onChange={handleImageIamge}

                                        />

                                    </div>
                                </div>
                            </li>
                            {/** 
                    <li>
                        <div className="grid grid-2">
                            <div className="d-flex flex-column msy-member1">
                            {addMemberBtn.map((btncnt,i)=>(
                                 <div className="d-flex w-100 msy-member2">
                                    
                                    <div className=" user-box w-100">
                                        <input type="email"  
                                        required
                                        defaultValue=''
                                        onChange={(e)=> {handelMember(e,i)}} />
                                        <label>Member</label>
                                    </div>
                                    <span className="btn add-btn" 
                                    onClick={()=>{
                                        setMembersEmail([...membersEmail,''])
                                        addMemberfunc()
                                    }}
                                    >+</span>
                                </div>   
                            ))}
                                
                            </div>

                            <div className="d-flex flex-column msy-tech1">
                            {addtechBtn.map((btncnt,i)=>(
                                
                                 <div className="d-flex w-100 msy-tech2">
                                     
                                    <div className=" user-box w-100">
                                        <input type="email"  
                                        required
                                        defaultValue=''
                                        onChange={(e)=> {handeltech(e,i)}} />
                                        <label>Tecnologies</label>
                                    </div>
                                    <span className="btn add-btn" 
                                    onClick={()=>{
                                        setTech([...tech,''])
                                        addtechfunc()
                                    }}
                                     >+</span>
                                </div> 
                            ))}
                                
                            </div>
                        </div>
                    </li>    
                    **/}
                            <li>
                                <div className=" user-box">
                                    <textarea type="email"
                                        required
                                        value={descrip}
                                        onChange={(e) => setDescrip(e.target.value)}
                                    ></textarea>
                                    <label>Description</label>
                                </div>
                            </li>

                            <li className="d-flex justify-content-end create-btn">
                                <button type="submit" className="btn btn-primary btn-ghost" >Submit</button>
                            </li>
                        </ul>
                    </div>
                </form>


        </section>
    )
}

export default CreateProject
