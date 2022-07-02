import axios from 'axios';
import { useEffect, useState,useRef } from 'react';
import React, { Component } from 'react';
import LoadingBtn from './LoadingBtn';


const AddIdea = ({ con_url }) => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [projectCreatedOrNot, setProjectCreatedOrNot] = useState(false)
    const timeOut = useRef(null);


    const d = new Date()


    const onSubmit = (e) => {
        e.preventDefault()
        setLoadingStatus(true)
        const url = con_url + "ideas"
        console.log(url)
        axios.post(url, {
            name: title,
            description: desc,
            createdAt: d.getFullYear() + d.getMonth() + d.getDate(),
            user: "http://localhost:8080/users/" + JSON.parse(localStorage.getItem('auth')).id
        }).then(res => {
            setProjectCreatedOrNot(true)
            setLoadingStatus(false)
            setDesc("")
            setTitle("")
            clearTimeout(timeOut.current)
            timeOut.current = setTimeout(() => {
                setProjectCreatedOrNot(false)
            }, 5000);
        })

    }

    return (

        <section className="section msy-main" id="top" data-section="section1">


            <form className="my-form login-box" onSubmit={onSubmit}>
                {
                    loadingStatus ? <LoadingBtn /> : <span></span>
                }

                <div className="container p-5">
                <div className={projectCreatedOrNot ? 'd-block' : 'd-none'}><h2 className='text-success d-flex align-center justify-content-center'><i class="bi bi-emoji-smile px-2"></i>Idea Submitted </h2></div>

                    <h2>Add Idea</h2>
                    <ul>
                        <li>
                            <div className=" user-box">
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                <label>Idea Title</label>
                            </div>
                        </li>

                        <li>
                            <div className=" user-box">
                                <textarea type="email" required value={desc} onChange={(e) => setDesc(e.target.value)} > </textarea>
                                <label>Description</label>
                            </div>
                        </li>

                        <li className="d-flex justify-content-around create-btn">
                            <button type="submit" className="btn btn-primary btn-ghost">Submit</button>
                        </li>
                    </ul>
                </div>
            </form>


        </section>
    )
}

export default AddIdea