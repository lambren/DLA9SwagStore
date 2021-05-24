import React, {useState} from 'react'
import {HOSTNAME} from './../Constants'
import {useAlert} from 'react-alert'

const CommentSection = (props) => {
    const user_id = props.user_id;
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const alert = useAlert();

    const onSubmit = () => {
        setLoading(true);
        fetch(HOSTNAME + 'post-comment', {
            method: 'POST', 
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({
                user_id, 
                content
            })
        }).then(res => res.json())
        .then(data => {
            if (data.status === 'SUCCESS') alert.success('SUCCESSFULLY POSTED COMMENT! THANK YOU FOR YOUR FEEDBACK!')
            else alert.error('OOPS! Something went wrong! Please try again later')
        }).catch(e => {
            console.log(e);
            alert.error('OOPS! Something went wrong! Please try again later');
        }).finally(() => {
            setContent('');
            setLoading(false);
        })
    }

    return(
        <div id='list-item' className='comment-box' style={{padding: '10px'}}>
            {(loading) ? <div className='loader'/> :
            <div>
                <h3>Comment Section</h3>
                <textarea value={content}
                    rows={5} 
                    style={{display:'block', width: '70vw'}}
                    placeholder='Please leave any comments for the SWAG store here. Thank you for your feed back!'
                    onChange={(e) => setContent(e.target.value)}/>
                <button onClick={onSubmit}>Submit</button>
            </div>}
        </div>
    )

}
export default CommentSection;