import React, { Component }  from 'react';

const LinksDetail = ({links,userType}) => {
    return (
        <div className="msy-link d-flex flex-column justify-content-around ">
            <table className='mb-0'>
                <thead>
                    <tr><th className='text-center'>Link</th></tr>
                </thead>
                <tbody  >
                    {links.length ? links.map((link)=>(
                        <tr key={link.id} >
                            <td className='text-center'>
                                <a className='w-100' href={link.reference} target="_blank">{link.name}</a>
                            </td>
                        </tr>
                    )) : <p className='p-3 mb-0  text-center'>No Link Available</p>}
                </tbody>
            </table>
            {
                userType.type==='OWNER' || userType.type==='MEMBER'?
                <button  type="button" className="btn  btn-danger" data-bs-toggle="modal" data-bs-target="#modalFormLink"><i className="fa fa-edit" ></i> </button>:""
            }
        </div>
    )
}

export default LinksDetail
