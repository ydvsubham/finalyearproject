import React from 'react'
import bgImg from '../images/hero_2.jpg'
import LoadingBtn from './LoadingBtn'
import {useState} from 'react'
import axios from 'axios'


const TimelineModal = ({timelines,con_url,projectId}) => {
    const [addmembBtn,setAddmembBtn]=useState([])
    const [title,setTitle]=useState("")
    const [status,setStatus]=useState(null)
    const [stageNumb,setStageNumb]=useState(null)
    const [loading , setLoading]=useState(false)

    const addMemberfunc =()=>{
        setAddmembBtn([...addmembBtn,1]) 
    }

    const onSubmitAddStage=(e)=>{
        e.preventDefault()
        setLoading(true)
        const url=con_url+"stages"
        axios.post(url,{
            name:title,
            stageNum:stageNumb,
            status:status,
            project:con_url+"projects/"+projectId
        }).then(res=>{
            setStageNumb(0)
            setTitle("")
            setStatus(0)
            setLoading(false)
        })
    }
    const onSubmitRemove=(e,stageId)=>{
        e.preventDefault()
        setLoading(true)
        const url=con_url+"stages/"+stageId
        axios.delete(url,{}).then(res=>{
            setLoading(false)
        })
        
    }


    //console.log(timelines)
    return (
        <div className="modal fade" id="modalFormTimeline" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                    <h2>Update Timeline</h2>
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
                                    <h5>Title</h5>
                                   { /*<h5>Description</h5>*/}
                                    <h5>Status</h5>
                                    <h5>Action</h5>
                                </div>
                                <form action="#" className="d-flex flex-column">
                                    {timelines.map((timeline)=>(
                                        <div className='d-flex mb-2 w-100 ipu' key={timeline.id} >
                                            <input type="text" className="form-control mr-3" defaultValue={timeline.name}></input>
                                            <input type="text" className="form-control mr-3" defaultValue={timeline.status }></input>
                                            <button 
                                            type="submit" 
                                            className="btn btn-primary" 
                                            defaultValue="Remove" 
                                            onClick={(e)=>onSubmitRemove(e,timeline.id)}
                                            >Remove</button>
                                        </div>
                                    ))}
                                    
                                </form>
                            
                            </div>
                        </div>
                        <div className='p-4 msy-add-member '>
                        {addmembBtn.length===1 ? 
                        <div className=" user-box mb-3  ">
                            <form className='d-flex' onSubmit={onSubmitAddStage}> 
                            <input type="text"  
                            required
                            placeholder='Title'
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            />
                            {/*
                            <input type="text"  
                            required
                            placeholder='Decription'
                            defaultValue=''
                            />
                        */}
                            <input type="number"  
                            required
                            placeholder='Stage Number'
                            value={stageNumb}
                            onChange={(e)=>setStageNumb(e.target.value)}
                            />
                            <input type="number"  
                            required
                            placeholder='Status'
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
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

export default TimelineModal