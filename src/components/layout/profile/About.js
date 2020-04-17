import React from 'react'

const About = ({about}) => {
    return (
        <div className="container row">
         <h4>About me</h4>
         <br /><br />
         {
             about?
             <p>{about}</p>
             :
             <button className="btn btn-primary btn-block">Type something about you</button>
         }
         <hr />
      </div>
    )
}

export default About