import React from 'react'

const TechDetails = ({techs,userType}) => {
    return (
        <div className="msy-tech d-flex flex-column justify-content-around">
            <table className='mb-0'>
                <thead>
                    <tr><th className='text-center'>Technolgies</th></tr>
                </thead>
                <tbody>
                    {techs.length ? techs.map((tech)=>(
                        <tr key={tech.id}><td className='text-center'>{tech.name}</td></tr>
                    )) : <p className='p-3 mb-0 text-center'>No Tech Available</p>}
                    
                </tbody>
            </table>{
                userType.type==='OWNER' || userType.type==='MEMBER'?
                <button  type="button" className="btn  btn-danger" data-bs-toggle="modal" data-bs-target="#modalFormTech"><i className="fa fa-edit" ></i></button>:""
            }
            
        </div>
    )
}

export default TechDetails
