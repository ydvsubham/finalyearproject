import bgImg from '../images/hero_2.jpg'
import LoadingBtn from './LoadingBtn';
import {useState} from 'react';
import axios from 'axios';
import React, { Component }  from 'react';



const DescriptionModal = ({description,projectId,con_url}) => {
    const[thisDescription,setThisDescription]=useState(description)
    const [loading , setLoading]=useState(false)

    const onSubmit =(e)=>{
        const url=con_url+"projects/"+projectId
        setLoading(true)
        e.preventDefault()
        axios.patch(url,{
            description : thisDescription,
        }).then(res=>{
            console.log(res.data)
            setLoading(false)
        })
    }
    return (
        <div className="modal fade" id="modalFormDescription" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                    <h2>Update Description</h2>
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
                                <form action="#" className="d-flex flex-column" onSubmit={onSubmit}>
                                    <div className='d-block  mb-2 w-100 ipu' >
                                        <textarea type="text"  name="description" className="form-control mb-2" value={thisDescription} onChange={(e)=>setThisDescription(e.target.value)} ></textarea>
                                        <input type="submit" className="btn btn-primary float-end"   value="Update" ></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default DescriptionModal
