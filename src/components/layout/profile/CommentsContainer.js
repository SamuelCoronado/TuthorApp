import React from 'react'
import Comment from './Comment';

const CommentsContainer = ({comments}) => {
    return (
        <div className="container row">
            <h4>Recent comments</h4>
            {
                comments.length === 0 ?
                <div className="container">
                    <h4>There are not comments</h4>
                </div>
                :
                <div style={{maxHeight: '400px', overflow: 'scroll'}}>
                    {
                        comments.map((comment) => {
                            return(
                                <Comment profileImage={comment.profileImage} name={comment.user.name} comment={comment.opinion} date={comment.date}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default CommentsContainer