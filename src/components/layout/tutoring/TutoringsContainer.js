import React, {useState} from 'react';
import Tutoring from './Tutoring';
import {connect} from 'react-redux';

const getChunks = (array) => {
    const chunks = [];
    let start = 0;
    let finish = 3

    while(start <= array.length){
        const newArray = array.slice(start, finish);
        chunks.push(newArray);
        start = finish
        finish +=3
    }

    return chunks;
}

const TutoringsContainer = ({user}) => {

    return (
        <>
      {  
           user == null?
           null
           :
           <div className="container">
           {
           getChunks(user.userTutorings)
            .map((array) => {
               return(
               <div className="row">
                   {array.map((tutoring) => <div className="col-md-4"><Tutoring tutoringInfo={tutoring}/></div>)}
               </div>
               )
           })
           }
           </div>
       }
        <h1>dsadas</h1>
       </>
    )
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps, null)(TutoringsContainer)
