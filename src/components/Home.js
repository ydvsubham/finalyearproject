import ProjectList from "./ProjectList"
import Contact_us from "./Contact_us"
import MainBanner from "./MainBanner"
import React, { Component }  from 'react';



const Home = ({projects}) => {
    return (
        <>
        <MainBanner />
        <ProjectList projects={projects}  />
        <Contact_us />
        </>
    )
}

export default Home
