import '../css/view_idea.css'
import Idea from './Idea'
import axios from 'axios';
import { useEffect, useState } from 'react';
import React, { Component }  from 'react';
import LoadingBtn from './LoadingBtn';
const AnonymousIdeas = ({con_url}) => {
    const [ideas, setIdeas]=useState([]);
    const [loadingStatus,setLoadingStatus]=useState(true)

    useEffect(() => {
        
        const url= con_url+"ideas";
        axios.get(url).then(response=>{
          
          //console.log(response.data._embedded.ideas)
          setIdeas([...response.data._embedded.ideas])
          //ideas.length ? console.log(ideas) : console.log("Empty")
          
        }).then((res)=>{
            setLoadingStatus(false)
        })
      },[ideas])
    return (
        <section className="section msy-main" id="top" data-section="section1">
            <div className="container bootstrap snippets bootdeys msy-ideas-container">
                {
                    loadingStatus?<LoadingBtn/>:<span></span>
                }
                <div className="row">
                    {ideas.map((idea,i)=>(
                        <Idea idea={idea} key={i} />
                    ))}
                    
                </div>
            </div>
        </section>

    )
}

export default AnonymousIdeas
