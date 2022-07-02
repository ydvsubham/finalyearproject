import bgImg from '../images/hero_2.jpg'
import {useState} from 'react';
import React, { Component }  from 'react';




const TechModal = ({techs,projectId}) => {
    const [addmembBtn,setAddmembBtn]=useState([])
    const addMemberfunc =()=>{
        setAddmembBtn([...addmembBtn,1]) 
    }
    const[thisTech,setThisTech]=useState('')
    const[techId,setTechId]=useState('')
    const onSubmit =(e)=>{
        e.preventDefault()
       
    }
    //console.log(techs)
    return (
        <div className="modal fade" id="modalFormTech" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content rounded-0">
                    <div className="modal-body bg-image overlay" style={{backgroundImage :  `url(${bgImg})`} }>
                        <div className="line px-3 to-front">
                            <div className="row align-items-center">
                                <div className="col logo">
                                    
                                </div>
                                <div className="col-md-8 text-center">
                                    <h2>Update Technolgies</h2>
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
                                    <h5>Technolgies</h5>
                                    <h5>Action</h5>
                                </div>
                                {techs.map((tech)=>(
                                    <form action="#"onSubmit={onSubmit} className="d-flex flex-column" key={tech.id}>
                                        <div className='d-flex mb-2 w-100 ipu' >
                                            <input type="text" className="form-control mr-3" defaultValue={tech.name} onChange={(e)=>{
                                                setThisTech(e.target.value)
                                                setTechId(tech.id)
                                                }}></input>
                                            <input type="submit" className="btn btn-primary" value="Remove"  ></input>
                                        </div>
                                    </form>
                                ))}
                            </div>
                        </div>
                        <div className='p-4 msy-add-member '>
                        {addmembBtn.length===1 ? 
                        <div className=" user-box mb-3  ">
                            <form className='d-flex'>
                            <input type="text"  
                            required
                            placeholder='Technologies'
                            defaultValue=''
                            />
                            <input type="submit" className="btn btn-primary"  value="Add" ></input>
                            </form>
                        </div> : "" }
                          {addmembBtn.length===0 ? <button className='btn btn-prinmary add-mem' onClick={addMemberfunc}>Add Tech</button> : ""}
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
}

export default TechModal
