import '../css/modal.css'
import bgImg from '../images/hero_2.jpg'
import LoadingBtn from './LoadingBtn';
import {useState} from 'react';
import axios from 'axios';
import React, { Component }  from 'react';


const LinkModal = ({links,projectId,con_url}) => {
    const [addmembBtn,setAddmembBtn]=useState([])
    const [link, setLink]=useState("")
    const [type,setType]=useState("")
    const [loading , setLoading]=useState(false)

    const addMemberfunc =()=>{
        setAddmembBtn([...addmembBtn,1]) 
    }

    const onSubmitAdd=(e)=>{
        e.preventDefault()
        setLoading(true)
        const url=con_url+"links/"
        axios.post(url,{
            name : type,
            reference:link,
            project : con_url+"projects/"+projectId
        }).then(res=>{
            setLoading(false)
        })
    }
    const onSubmitRemove=(e,linkId)=>{
        e.preventDefault()
        setLoading(true)
        const url=con_url+"links/"+linkId
        axios.delete(url,{}).then(res=>{
            setLoading(false)
        })
        
    }
    return (
        <div className="modal fade" id="modalFormLink" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content rounded-0">
                    <div className="modal-body bg-image overlay" style={{backgroundImage :  `url(${bgImg})`} }>
                    {
                        loading ? <LoadingBtn /> : <span></span>
                    }
                        <div className="line px-3 to-front">
                            <div className="row align-items-center">
                                <div className="col logo">
                                    
                                </div>
                                <div className="col-md-8 text-center">
                                    <h2>Update Links</h2>
                                </div>
                                <div className="col text-right">
                                    <a href="#" className="close-btn" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"><span className="icon-close2"></span></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 to-front">
                            <div className="text-center">
                            <div className='  d-flex justify-content-between mb-2  w-100 msy-modal-table-head ipu' >
                                    <h5>Link</h5>
                                    <h5>Link Type</h5>
                                    <h5>Action</h5>
                                </div>
                                <form action="#" className="d-flex flex-column">
                                    {links.map((link)=>(
                                        <div className='d-flex mb-2 w-100 ipu'  key={link.id}>
                                            <input type="text" className="form-control mr-3" defaultValue={link.name} ></input>
                                            <input type="text" className="form-control mr-3" defaultValue={link.reference}></input>
                                            <button type="submit" 
                                                className="btn btn-primary"
                                                value="Remove" 
                                                onClick={(e)=>onSubmitRemove(e,link.id)}
                                                >Remove</button>
                                        </div>
                                    ))}
                                    
                                </form>
                            
                            </div>
                        </div>
                        <div className='p-4 msy-add-member '>
                        {addmembBtn.length===1 ? 
                        <div className=" user-box mb-3  ">
                            <form className='d-flex' onSubmit={onSubmitAdd}>
                            <input type="text"  
                            required
                            placeholder='Link Type'
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                            />
                            <input type="text"  
                            required
                            placeholder='Link'
                            defaultValue=''
                            value={link}
                            onChange={(e)=>setLink(e.target.value)}
                            />
                            <input type="submit" className="btn btn-primary"  value="Add" ></input>
                            </form>
                        </div> : "" }
                          {addmembBtn.length===0 ? <button className='btn btn-prinmary add-mem' onClick={addMemberfunc}>Add Link</button> : ""}
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default LinkModal
