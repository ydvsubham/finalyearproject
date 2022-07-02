import React from 'react'

const TimeLineStage = ({timeline}) => {
    //console.log(timeline)
    return (
        <>
        <h2 className="timeline__item timeline__item--year">{timeline.completedAt}</h2>
        <div className="timeline__item">
            <h3 className="timeline__title">{timeline.name}</h3>
            {
            //<p class="timeline__blurb">Started internship at company 2</p>
            }
        </div> 
        </>
        
    )
}

export default TimeLineStage
