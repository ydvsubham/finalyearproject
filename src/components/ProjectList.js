import '../css/main_msy.css'
import Project from './Project'
import React, { Component }  from 'react';
import {useState,useRef} from 'react';
import LoadingBtn from './LoadingBtn';


const ProjectList = ({projects}) => {
    const [loadingStatus,setLoadingStatus]=useState(true)

    const hidefilter = {
        display:"none"
    }
    const showfilter = {
        display:"flex"
    }
    const [fltrBtnStatus, setFltrBtnStatus]=useState(0)

    const filterToggle=(e,status)=>{
        e.preventDefault()
        console.log("yes")
        if(status){
            setFltrBtnStatus(1)
        }else{
            setFltrBtnStatus(0)
        }
    }

    const [tagapi, setTagapi]=useState([
        {
            prev:null,
            curr:1,
            data:"Web Devlopment"
        },
        {
            prev:null,
            curr:2,
            data:"Machine learning"		
        },
        {
            prev:null,
            curr:3,
            data:"Artificial Intelligence"
        },
        {
            prev:null,
            curr:4,
            data:"Android development"
        },
        {
            prev:null,
            curr:5,
            data:"IOS developement"
        },
        {
            prev:1,
            curr:6,
            data:"JavaScript"
        },
        {
            prev:1,
            curr:7,
            data:"PHP"
        },
        {
            prev:1,
            curr:8,
            data:"Python"
        },
        {
            prev:1,
            curr:9,
            data:"Java"
        },
        {
            prev:6,
            curr:10,
            data:"React js"
        },
        {
            prev:6,
            curr:11,
            data:"Node js"
        },
        {
            prev:6,
            curr:12,
            data:"Angular"
        },  
    ])
    const[tags,setTags]=useState([
        {
            id:1,
            name:"Computer Science",
        },
        {
            id:2,
            name:"Electrical",
        },
        {
            id:3,
            name:"Electronic and Commmunication",
        },
        {
            id:4,
            name:"Chemical",
        },
        {
            id:5,
            name:"Mechanical",
        },
        {
            id:6,
            name:"Metallurgy",
        },
        {
            id:7,
            name:"Civil",
        },
        {
            id:8,
            name:"Minning",
        },
    ])
    return (
        <section className="section courses" data-section="section4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2>Choose The Project</h2>
                        </div>
                    </div>
                    <div className="container d-flex justify-content-end mb-2 fltr-btn">
                        <button type="button" className="btn btn-primary" onClick={(e)=>{filterToggle(e,fltrBtnStatus)}}>Filter</button>
                    </div> 
                    <div className="container rounded p-2 msy-filter" style={fltrBtnStatus ? hidefilter : showfilter}>
                    {tags.map((tag)=>(
                        <button 
                            key={tag.id} 
                            type="button" 
                            className={`btn mx-2 `}
                            
                            onClick={()=>window['init'](tagapi)}
                        >{tag.name}</button>
                    ))}
                    </div>
                    <div className="container d-flex p-2 bd-highlight flex-wrap justify-content-between msy-project-card-cont">
                        {projects.length ? 
                        projects.map((project)=>(
                            
                            <Project project={project} key={project.id} />
                        )):<LoadingBtn />}
                        
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default ProjectList
