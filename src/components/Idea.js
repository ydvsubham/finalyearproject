import React,{ Component } from 'react'



const Idea = ({idea}) => {
    
    return (
        
        <div className="col-md-4 col-sm-6 content-card">
            <div className="card-big-shadow">
                <div className="card card-just-text" data-background="color" data-color="orange" data-radius="none">
                    <div className="content">
                        <h4 className="title"><a href="#">{idea.name}</a></h4>
                        <p className="description">{idea.description}</p>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Idea
