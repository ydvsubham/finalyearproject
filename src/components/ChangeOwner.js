import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react';
import bgImg from '../images/hero_2.jpg'
import LoadingBtn from './LoadingBtn';

const ChangeOwner = ({projectId,con_url}) => {
    const [addmembBtn,setAddmembBtn]=useState([])
    const [userMail,setUserMail]=useState("")
    const [currentMailStatus,setCurrentMailStatus]=useState(false)
    const [memberMails,setMemberMails]=useState([])
    const [memberId,setMemberId]=useState(null)
    const [loading , setLoading]=useState(false)
 

   
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
            const url=con_url+"custom/api/projects/"+projectId+"/users/"+memberId
            console.log(url)
        axios.put(url,{}).then(res=>{
            setUserMail("")
            setLoading(false)
            console.log("add end")
        })
        }
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
    <div className="modal fade" id="changeOwner" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                    <h2>Update Owner</h2>
                                </div>
                                <div className="col text-right">
                                    <a href="#" className="close-btn" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"><span className="icon-close2"></span></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                       
                        <div className='p-4 msy-add-member '>
                        
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
                            <input type="submit" className="btn btn-primary"  value="Change Owner" ></input>
                            </form>
                        </div> 
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ChangeOwner