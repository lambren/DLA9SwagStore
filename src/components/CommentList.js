import React, { useEffect, useState } from 'react'
import { HOSTNAME } from './../Constants'
import {useAlert} from 'react-alert'

const CommentList = (props) => {
    const {user_id} = props
    const alert = useAlert();


    const [comments, setComments] = useState([]);

    const fetchData = () => {
        fetch(HOSTNAME + 'get-all-comments')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.status === "SUCCESS") 
                setComments(data.data);
            else alert.error('ERROR FETCHING COMMENTS');
        }).catch(e => {
            console.log(e);
        })
    }
    useEffect(fetchData, []);

    return (
        <div id='list-item' className='comment-box'>
            <h3>Comments</h3>
                <div className='comments'>
                {
                    comments.map(item => 
                        <div key={item.comment_id} style={{borderBottom: 'solid gray 1px'}}>
                            <p>{item.user_name} ({item.user_first_name}): {item.content}</p>
                            <p>{item.response}</p>
                        </div>
                    )
                }
                </div>
        </div>
    )
}
export default CommentList;