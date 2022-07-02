import React, { Component } from 'react';
import { useState } from 'react';


const MembersDetails = ({ members, userType }) => {
    console.log(userType)
    const [thismem,setThismem]=useState([])
    const t=members
    t.sort(function(a, b) {
        var keyA = a.id,
          keyB = b.id;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    //setThismem(t)
    return (
        <div className="msy-member d-flex flex-column justify-content-around">
            <table className='mb-0'>
                <thead>
                    <tr><th className='text-center'>Member</th></tr>
                </thead>
                <tbody>
                    {t.length ? t.map((member) => (
                        <tr key={member.id}><td className='text-center'>{member.name}</td></tr>
                    )): <p className='p-3 mb-0  text-center'>No Member Available</p>}
                    

                </tbody>
            </table>
            {
                userType.type==='OWNER' || userType.type==='MEMBER'?
                    <button type="button" className="btn  btn-danger" data-bs-toggle="modal" data-bs-target="#modalFormMember">
                        <i className="fa fa-edit" ></i>
                    </button> :""
            }

        </div>
    )
}

export default MembersDetails
