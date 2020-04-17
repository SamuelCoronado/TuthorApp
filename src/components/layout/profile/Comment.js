import React from 'react'

const Comment = ({profileImage, name, comment, date}) => {
    return (
        <div className="card" style={{width: '800px'}}>
        <div className="card-body">
          <img src={profileImage} style={{width: '50px', height: '50px'}} className="rounded float-left" alt="" />
          <p>&nbsp;<strong>{name}</strong>&nbsp;{date}</p><br />
          <p>{comment}</p>
        </div>
      </div>
    )
}

export default Comment