import React, {useState} from 'react';
import {useAlert} from 'react-alert';


import {HOSTNAME} from './../Constants'
import Amazon from './../asset/Amazon.jpg'
import './../App.scss'

const Password = (props) => {
    const alert = useAlert();

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onChangeConfirm = (event) => {
        setConfirm(event.target.value);
    }

    const onCreate = (event) => {
        event.preventDefault();


        if (password === confirm)
        {
            setLoading(true);
            fetch(HOSTNAME + 'initiate-password/', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: props.user_id,
                        password: password,
                    })
            }).then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.status === 'SUCCESS') 
                {
                    alert.success('Successfully created your password! Please remember it for future log in! Enjoy shopping!');
                    props.setRoute('ORDER');
                }
                else 
                {
                    alert.error('Password not created! please try again later or contact IT support!')
                    props.setRoute('LOGIN');
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
                alert.error('Cannot connect to server, please check your connection!');
                props.setRoute('LOGIN');
            })
        }
        else alert.error('password and confirmation do not match, please try again');
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setLoading(true);

        fetch(HOSTNAME + 'login/', 
        {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                user_id: props.user_id,
                password: password,
            })
        }).then(res=>res.json())
        .then(data => {
            setLoading(false);
            
            if (data.status === 'SUCCESS')
            {
                if (data.match) 
                {
                    alert.success('AUTHENTICATION COMPLETED! Enjoy shopping!')
                    props.setRoute('ORDER');
                }
                else
                {
                    alert.error('AUTHENTICATION FAILED! PLEASE TRY AGAIN WITH CORRECT INFORMATION!');
                    props.setRoute('LOGIN');
                }
            }
            else 
            {
                alert.error('SERVER ERROR: FAILED TO AUTHENTICATE! PLEASE TRY AGAIN LATER');
                props.setRoute('LOGIN');

            }
        }).catch(err => {
            setLoading(false);
            alert.error('CANNOT CONNECT TO SERVER, PLEASE CHECK YOUR CONNECTION!');
            props.setRoute('LOGIN');
        })
    }

    return (
        <div id='main-screen'>
            {(loading) ? <div className='loader'></div> :
                (props.noPassword.current)? 
                    <div>
                        <h1>First time logging in? Create a password for verification!</h1>
                        <form onSubmit={onCreate} className='my-form'>

                            <label>Password</label>
                            <input type='password' onChange={onChangePassword}></input>
                            <label>Confirm Password</label>
                            <input type='password' onChange={onChangeConfirm}></input>
                            <button onClick={onCreate}>Submit</button>
                        </form>
                    </div>
                    :
                    <div>
                        <h1>Verify that it's YOU!</h1>
                        <form className='my-form' onSubmit={onSubmit}>

                            <label>Password</label>
                            <input type='password' onChange={onChangePassword}></input>
                            <button onClick={onSubmit}>Submit</button>
                        </form>
                    </div>
            }
            <img src={Amazon} alt='Amazon Logo' width='320px' height='auto'/>
        </div>
    )
}

export default Password;