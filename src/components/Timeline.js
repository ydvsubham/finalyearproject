import TimeLineStage from "./TimeLineStage"
import React, { Component }  from 'react';

const Timeline = ({timelines,userType}) => {
    //console.log(timelines)
    return (
        <>
        <div className="msy-timeline-cont">
            <div className="msy-timeline-head ">
                <h2 className="text-center">Timeline</h2>
            </div>
            <div className="timeline">
                {timelines.length ? timelines.map((timeline)=>(
                    <TimeLineStage timeline={timeline} key={timeline.id} />
                )) : <p className='p-3'>No Stage Yet</p>}
            </div>
        </div>
        <div className="d-flex flex-row justify-content-between">
            { userType.type==='OWNER' || userType.type==='MEMBER'?
            <button type="button" className="btn  btn-danger" data-bs-toggle="modal" data-bs-target="#modalFormTimeline"><i className="fa fa-edit"></i></button>:""}
        </div>
        </>
    )
}

export default Timeline
