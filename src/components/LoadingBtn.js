import React, { Component }  from 'react';

const LoadingBtn = () => {
  return (
    <div className='msy-loading-btn w-100 h-100 d-flex justify-content-center align-items-center'>
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}

export default LoadingBtn