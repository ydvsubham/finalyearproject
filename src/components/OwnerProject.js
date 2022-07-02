import '../css/main_msy.css'
import Project from './Project'
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingBtn from './LoadingBtn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectMemberView from './ProjectMemberView';

const MyProjects = ({ con_url, }) => {
    const [projectFetch, setProjectFetch] = useState([])
   // const [loadingStatus, setLoadingStatus] = useState(true)

    const hidefilter = {
        display: "none"
    }
    const showfilter = {
        display: "flex"
    }
    const [fltrBtnStatus, setFltrBtnStatus] = useState(0)

    const filterToggle = (e, status) => {
        e.preventDefault()
        if (status) {
            setFltrBtnStatus(1)
        } else {
            setFltrBtnStatus(0)
        }
    }
    useEffect(() => {
        const url = con_url + "users/" + JSON.parse(localStorage.getItem('auth')).id + "/projectsOwned";
        axios.get(url).then(response => {
            if (response !== null && typeof response !== 'undefined') {
                if (response.data !== null && typeof response.data !== 'undefined') {
                    if (response.data._embedded !== null && typeof response.data._embedded !== 'undefined') {
                        setProjectFetch(response.data._embedded.projects)
                    }
                }
            }

        }).then((res) => {
            //setLoadingStatus(false)
        })

    }, [projectFetch])
    const [tags, setTags] = useState([
        {
            id: 1,
            name: "Computer Science",
        },
        {
            id: 2,
            name: "Electrical",
        },
        {
            id: 3,
            name: "Electronic and Commmunication",
        },
        {
            id: 4,
            name: "Chemical",
        },
        {
            id: 5,
            name: "Mechanical",
        },
        {
            id: 6,
            name: "Metallurgy",
        },
        {
            id: 7,
            name: "Civil",
        },
        {
            id: 8,
            name: "Minning",
        },
    ])

    return (
        <section className="section courses" data-section="section4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2>Owner Project</h2>
                        </div>
                    </div>
                    <div className="container d-flex justify-content-end mb-2 fltr-btn">
                        <button type="button" className="btn btn-primary" onClick={(e) => { filterToggle(e, fltrBtnStatus) }}>Filter</button>
                    </div>
                    <div className="container rounded p-2 msy-filter" style={fltrBtnStatus ? hidefilter : showfilter}>
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                className={`btn mx-2 `}
                            >{tag.name}</button>
                        ))}
                    </div>
                    <div className="container d-flex p-2 bd-highlight flex-wrap justify-content-between msy-project-card-cont">
                        
                        {projectFetch.length ?
                            projectFetch.map((project) => (

                                <Project project={project} key={project.id} />
                            )) : <LoadingBtn />}

                    </div>
                </div>
            </div>
            {/* <Routes>
            {projectFetch.map((project) => (
                <Route
                  key={project.id}
                  exact
                  path={"/ownerproject/" + project.id}
                  element={< ProjectMemberView pid={project.id} con_url={con_url} key={project.id} />}>{console.log("/ownerproject/" + project.id)}
                </Route>
                
              ))}
            </Routes> */}
        </section>

    )
}

export default MyProjects
