import React, { Component } from 'react';

const Description = ({ description,userType }) => {
    return (
        <>

            <div className="msg-description_text rounded p-3 d-flex flex-row justify-content-around">

                <p className="d-inline mr-3" >{description}</p>
                {
                    userType.type === 'OWNER' || userType.type === 'MEMBER' ?
                        <button type="button" className="btn  btn-danger desc-btn float-end" data-bs-toggle="modal" data-bs-target="#modalFormDescription">
                            <i className="fa fa-edit" ></i>
                        </button> : ""
                }

            </div>

        </>
    )
}

export default Description
