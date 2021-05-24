import React from 'react'
import CommentSection from './CommentSection'
import CommentList from './CommentList'

const CommentPage = (props) => {
    const {user_id} = props

    return (
        <div id='main-screen'
            style={{marginTop: '5em'}}>
            <CommentList user_id={user_id}/>
            <CommentSection user_id={user_id}/>
        </div>
    )
}
export default CommentPage;