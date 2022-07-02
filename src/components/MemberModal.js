import bgImg from '../images/hero_2.jpg'
import {useState,useEffect} from 'react';
import LoadingBtn from './LoadingBtn';
import axios from 'axios';
import React, { Component }  from 'react';

const MemberModal = ({projectId,members,tempfun,con_url}) => {
    const [addmembBtn,setAddmembBtn]=useState([])
    const [userMail,setUserMail]=useState("")
    const [currentMailStatus,setCurrentMailStatus]=useState(false)
    const [memberMails,setMemberMails]=useState([])
    const [memberId,setMemberId]=useState(null)
    const [loading , setLoading]=useState(false)
    const addMemberfunc =()=>{
        setAddmembBtn([...addmembBtn,1]) 
    }

   
    const validateMail=()=>{
        var flag=false
        memberMails.filter((mail)=>{
            if(mail.email===userMail){
                flag=true
                setMemberId(mail.id)
                //console.log(mail.email)
                //console.log(userMail)
            }
        })
        flag ? setCurrentMailStatus(true) : setCurrentMailStatus(false)
    }

   
    const onSubmitAdd=(e)=>{
        e.preventDefault()
        setLoading(true)
        console.log("add start")
        if(currentMailStatus){
            const url=con_url+"custom/api/projects/"+projectId+"/members/"+memberId
            console.log(url)
        axios.put(url,{}).then(res=>{
            setUserMail("")
            setLoading(false)
            console.log("add end")
        })
        }
    }
    const onSubmitUpdate=(e)=>{
        e.preventDefault()
        if(currentMailStatus){
            const url=con_url+"custom/api/projects/"+projectId+"/members/"+memberId
        axios.put(url,{}).then(res=>{
            setUserMail("")
        })
        }
    }

    const onSubmitRemove=(e,m_Id)=>{
        e.preventDefault()
        setLoading(true)
        const url=con_url+"custom/api/projects/"+projectId+"/members/"+m_Id
        axios.delete(url,{}).then(res=>{
            setLoading(false)
        })
        
    }


    useEffect(() => {
        const url=con_url+"users/";
        axios.get(url).then(response=>{
          
          //console.log(response.data)
          setMemberMails(response.data._embedded.users)
          //memberMails.length ? console.log(memberMails) : console.log("Empty")
          
        })
        validateMail()
       
      },[memberMails])
    
    
    
    
    return (
        <div className="modal fade" id="modalFormMember" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                    <h2>Update Members</h2>
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
                                    <h5>Name</h5>
                                    <h5>action</h5>
                                </div>
                                {members.map((member)=>(
                                    <form action="#" className="d-flex flex-column"  key={member.id} onSubmit={onSubmitUpdate}>
                                        <div className='d-flex mb-2 w-100 ipu' >
                                            <input type="text" className="form-control mr-3" defaultValue={member.name} disabled ></input>
                                                <button type="submit" 
                                                className="btn btn-primary"
                                                value="Remove" 
                                                onClick={(e)=>onSubmitRemove(e,member.id)}
                                            >Remove</button> 
                                        </div>
                                    </form>
                                    ))}
                            </div>
                        </div>
                        <div className='p-4 msy-add-member '>
                        {addmembBtn.length===1 ? 
                        <div className="user-box mb-3">
                            <form className='d-flex' onSubmit={onSubmitAdd} >
                            <input type="text"  
                            required
                            placeholder='UserMail'
                            value={userMail}
                            onChange={(e)=>setUserMail(e.target.value)}
                            />
                            {currentMailStatus ? 
                            <span className='d-flex align-items-center mx-2 green-tick' ><i className="fa fa-check " aria-hidden="true"></i></span> :
                            <span className='d-flex align-items-center mx-2 red-cross' ><i className="fa fa-times" aria-hidden="true"></i></span>
                            }
                            <input type="submit" className="btn btn-primary"  value="Add" ></input>
                            </form>
                        </div> : "" }
                          {addmembBtn.length===0 ? <button className='btn btn-prinmary add-mem' onClick={addMemberfunc}>Add Member</button> : ""}
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default MemberModal
