import React,{  useState, useEffect } from 'react'
import Helmet from 'react-helmet'

const GraphicalFilter = () => {


    const hidefilter = {
        display: "none"
    }
    const showfilter = {
        display: "flex"
    }
    const [fltrBtnStatus, setFltrBtnStatus] = useState(0)

    const filterToggle = (e, status) => {
        e.preventDefault()
        console.log("yes")
        if (status) {
            setFltrBtnStatus(1)
        } else {
            setFltrBtnStatus(0)
        }
    }

    const [tagapi, setTagapi] = useState([
        {
            prev: null,
            curr: 1,
            data: "Web Devlopment"
        },
        {
            prev: null,
            curr: 2,
            data: "Machine learning"
        },
        {
            prev: null,
            curr: 3,
            data: "Artificial Intelligence"
        },
        {
            prev: null,
            curr: 4,
            data: "Android development"
        },
        {
            prev: null,
            curr: 5,
            data: "IOS developement"
        },
        {
            prev: null,
            curr: 116,
            data: "Mac developement"
        },
        {
            prev: null,
            curr: 117,
            data: "Wii developement"
        },
        
        {
            prev: 1,
            curr: 6,
            data: "JavaScript"
        },
        {
            prev: 1,
            curr: 7,
            data: "PHP"
        },
        {
            prev: 1,
            curr: 8,
            data: "Python"
        },
        {
            prev: 1,
            curr: 9,
            data: "Java"
        },
        {
            prev: 6,
            curr: 10,
            data: "React js"
        },
        {
            prev: 6,
            curr: 11,
            data: "Node js"
        },
        {
            prev: 6,
            curr: 12,
            data: "Angular"
        },
    ])
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
        <>
            <div className='graphtopmagin'>
                <div className="container d-flex justify-content-end mb-2 fltr-btn mt-5">
                    <button type="button" className="btn btn-primary" onClick={(e) => { filterToggle(e, fltrBtnStatus) }}>Filter</button>
                </div>
                <div className="container rounded p-2 msy-filter" style={fltrBtnStatus ? hidefilter : showfilter}>
                    {tags.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            className={`btn mx-2 `}

                            onClick={() => window['init'](tagapi,tag)}
                        >{tag.name}</button>
                    ))}
                </div>
                <div id='myoverlay' className="outsideWrapper">
                    <div className="insideWrapper">
                        {/*<img src={canvasBg} class="coveredImage" />*/}
                        <canvas id="myCanvas" className="coveringCanvas"></canvas>
                    </div>
                </div>
            </div>
            <Helmet>
                <script src="/tempgraph.js" type="text/javascript" />
            </Helmet>
        </>

    )
}

export default GraphicalFilter