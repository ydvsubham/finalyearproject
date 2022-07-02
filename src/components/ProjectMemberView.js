import '../css/puv_msy.css'
import Description from './Description'
import MembersDetails from './MembersDetails'
import LinksDetail from './LinksDetail'
import TechDetails from './TechDetails'
import Timeline from './Timeline'
import MemberModal from './MemberModal'
import LinkModal from './LinkModal'
import TechModal from './TechModal'
import DescriptionModal from './DescriptionModal'
import TimelineModal from './TimelineModal'
import LoadingBtn from './LoadingBtn'
import JobsContainer from './JobsContainer'
import HireModal from './HireModal'
import { useState, useEffect } from 'react';
import axios from 'axios';
import React, { Component } from 'react';
import OwnerPrivillages from './OwnerPrivillages'
import ChangeOwner from './ChangeOwner'


const ProjectMemberView = ({ pid, con_url }) => {
  const [projectDetails, setProjectDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState({ type: null, id: null })
  const [loadingStatus, setLoadingStatus] = useState(true)

  useEffect(() => {
    const url = con_url + "projects/" + pid + "?projection=projectProjection";
    axios.get(url).then(response => {
      setProjectDetails([response.data])
      //console.log(response.data.owner)
      if (JSON.parse(localStorage.getItem('auth')) !== null && (typeof response.data.owner !== 'undefined') && (response.data.owner !== null)) {
        //console.log(response.data.owner)
        if ((JSON.parse(localStorage.getItem('auth')).id === response.data.owner.id)) {

          setUserType({ type: "OWNER", id: response.data.owner.id })
        } else {

          let mem = response.data.members
          mem.map((thismember) => {
            if (thismember.id === JSON.parse(localStorage.getItem('auth')).id) {
              //console.log("mem runing")
              setUserType({ type: "MEMBER", id: thismember.id })
            }
          })
        }
      }else if(response.data.members.length!==0){
        
        let mem = response.data.members
        console.log(mem)
          mem.map((thismember) => {
            if (thismember.id === JSON.parse(localStorage.getItem('auth')).id) {
              //console.log("mem runing")
              setUserType({ type: "MEMBER", id: thismember.id })
            }
          })
      }
    }).then((res) => {
      setLoadingStatus(false)
    })
  }, [projectDetails])

  //console.log(projectDetails[0])

  return (
    <section className="section msy-main" id="top" data-section="section1">
      
        <div className="container rounded p-5  d-flex flex-column justify-content-around  msy-filter msy-project-area">
          
          {projectDetails.length ? <>
          {
            userType.type === 'OWNER' || userType.type === 'MEMBER' ?
              <button type="button" className="btn  btn-danger msy-hire" data-bs-toggle="modal" data-bs-target="#hireFormMember">Hire</button>
              : ""
          }

          <div className="d-block">
            <h2 className="text-center">{projectDetails[0].name}</h2>
          </div>
          <div>
            <Description description={projectDetails[0].description} userType={userType} />
          </div>
          <div className="row">
            <div className="col-4">
              <div className="msy-timeline-head ">
                <h2 className="text-center">Meta Info</h2>
              </div>
              <div className="d-flex flex-column justify-content-around p-4  mlt-cont">
                <LinksDetail links={projectDetails[0].links} userType={userType} />
                <TechDetails techs={projectDetails[0].tags} userType={userType} />
                <MembersDetails members={projectDetails[0].members} userType={userType} />
                {userType.type === 'OWNER' ?
                <OwnerPrivillages userType={userType} con_url={con_url} projectId={pid}  />:""}
              </div>
            </div>
            <div className="col-8">
              <Timeline timelines={projectDetails[0].stages} userType={userType} />
            </div>
          </div>

          <JobsContainer jobs={projectDetails[0].jobs} userType={userType} con_url={con_url}  />

        
        <MemberModal members={projectDetails[0].members} projectId={pid} con_url={con_url} />
        <LinkModal links={projectDetails[0].links} con_url={con_url} projectId={pid} />
        <TechModal techs={projectDetails[0].tags} projectId={pid} />
        <DescriptionModal description={projectDetails[0].description} projectId={pid} con_url={con_url} />
        <TimelineModal timelines={projectDetails[0].stages} projectId={pid} con_url={con_url} />
        <HireModal members={projectDetails[0].members} projectId={pid} con_url={con_url}></HireModal>
        <ChangeOwner members={projectDetails[0].members} projectId={pid} con_url={con_url}  />
      </> : <LoadingBtn />}
      </div>

    </section>
  )
}

export default ProjectMemberView
