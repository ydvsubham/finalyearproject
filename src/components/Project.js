import Tech from './Tech'
import { BrowserRouter as Router , Routes,Route , Link } from 'react-router-dom'
import React, { Component }  from 'react';

const Project = ({project}) => {
    //console.log(project);
   // const img="../images/1.jpg";
   
    return (
        <div className="item d-flex flex-column msy-poject-c-w">
            <div className="hovereffect mb-0">
                <img src={project.id%2 ? '/img/1.jpg' : '/img/2.jpg'} className="img-fluid img-responsive w-100 " alt="Course #1"></img>
                <div className="overlay">
                    {/*<h2>Technologies</h2>*/}
                    {/**project.tags.length ? (project.tags).map(tech => {
                    return (<Tech tech={tech.name} />)
                    }) : 'no tech'**/}
                </div>
            </div>
            <div className="down-content ">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <div className="author-image ">
                    <h6>{project.owner ? project.owner.name:"null"}</h6>
                </div>
                <div className="text-button-pay">
                    <Link  to={"../" + project.id} >{"Read more"}<i className="fa fa-angle-double-right"></i></Link>
                </div>
            </div>
           
        </div>
    )
}

export default Project
