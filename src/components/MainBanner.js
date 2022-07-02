import Bgvid from '../images/course-video.mp4'
import React, { Component }  from 'react';



const MainBanner = () => {
    return (
        <section className="section main-banner msy-main-banner" id="top" data-section="section1">
            <video autoPlay muted loop id="bg-video">
                <source src={Bgvid} type="video/mp4" />
            </video>

            <div className="video-overlay header-text">
                <div className="caption">
                    <h6>Portal for course management</h6>
                    <h2>Discover  <em>Project</em> </h2>
                    <div className="main-button">
                        <div className="scroll-to-section"><a href="#section2">Discover more</a></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainBanner
