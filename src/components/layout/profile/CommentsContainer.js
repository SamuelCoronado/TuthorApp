import React from 'react'
import {StudentComment} from './Comment';
import {TutorComment} from './Comment';

const CommentsContainer = ({comments}) => {
    return (
        <>
         <div className="container row">
            <h4>Recent comments <i className="fas fa-comments"></i></h4>
            {
                comments.opinionsAsTutor.length === 0 && comments.opinionsAsStudent.length === 0 ?
                <div className="container">
                    <h4>There are not comments</h4>
                </div>
                :
                    <>
                    {comments.opinionsAsTutor.length > 0 && 
                        <div style={{maxHeight: '200px', overflow: 'scroll'}}>
                            <h4 className="text-left">As tutor <i className="fas fa-chalkboard-teacher"></i></h4>
                            {comments.opinionsAsTutor.map((opinion) => 
                                <StudentComment 
                                    profileImage={opinion.profileImage} 
                                    student={opinion.student}
                                    studentName={opinion.studentName}
                                    session={opinion.session}
                                    sessionName={opinion.sessionName}
                                    opinion={opinion.opinion}
                                    rating={opinion.rating}
                                    date={opinion.date}     
                                />
                                )}
                        </div>
                    }
                    <br/>
                    {comments.opinionsAsStudent.length > 0 && 
                        <div style={{maxHeight: '200px', overflow: 'scroll'}}>
                            <h4 className="text-left">As student </h4>
                            {comments.opinionsAsStudent.map((opinion) => 
                                <TutorComment 
                                    profileImage={opinion.profileImage} 
                                    tutor={opinion.tutor}
                                    tutorName={opinion.tutorName}
                                    session={opinion.session}
                                    sessionName={opinion.sessionName}
                                    opinion={opinion.opinion}
                                    rating={opinion.rating}
                                    date={opinion.date}     
                                />
                                )}
                        </div>
                    }
                    </>
            }
         </div>
        </>
    )
}

export default CommentsContainer