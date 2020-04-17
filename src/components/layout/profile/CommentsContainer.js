import React from 'react'
import Comment from './Comment';

const CommentsContainer = ({comments}) => {
    return (
        <div className="container row">
            <h4>Recent comments</h4>
            {
                comments.length === 0 ?
                <h4>There are not comments</h4>
                :
                <div style={{maxHeight: '400px', overflow: 'scroll'}}>
                    {
                        comments.map((comment) => {
                            return(
                                <Comment profileImage={comment.profileImage} name={comment.name} comment={comment.comment} date={comment.date}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default CommentsContainer