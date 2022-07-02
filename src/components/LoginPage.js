import '../css/loginPage.css';
import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

const LoginPage = () => {
    let path = 'http://localhost:8080/users'
   
    return (
        <section className='msy-loginsection d-flex align-items-center' >
            <form className="my-form  msy-loginform login-box">
                <div className="p-5">
                    <h4>Login with Mnit google account</h4>
                    <ul className='mt-5'>

                        <li className="d-flex justify-content-around create-btn">
                            <a href={path} className="btn btn-primary btn-login  rounded-circle" >
                                <i className="fa-brands fa-google"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </form>
        </section>
    )

};

export default LoginPage;
