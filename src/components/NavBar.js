import React from 'react';

import {HOSTNAME} from './../Constants';

import {useAlert} from 'react-alert';

import './../App.scss';

const NavBar = (props) => {

    const alert = useAlert();

    const goToStore = () => {
        props.setCommentPage(false);
        props.setSearch('');
        props.setCurrentList('LOADING');
        fetch(HOSTNAME + 'get-list-of-swag')
            .then(res => res.json())
            .then(data => {
                props.setItemList(data.swag_items);
                props.setCurrentList('STORE');
            })
            .catch(err => {
                console.log(err);
                alert.error('Connection to the server lost! Please check your internet connection!');
                props.setCurrentList('STORE');
            });
    }

    const goToCart = () => {
        props.setCommentPage(false);
        props.setSearch('');
        props.setCurrentList('LOADING');
        fetch(HOSTNAME + 'get-cart/' + props.user_id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                props.setCart(data.data);
                props.setCurrentList('CART');
            })
            .catch(err => {
                 console.log(err);
                 alert.error('Connection to the server lost! Please check your internet connection!');
                 props.setCurrentList('CART');
            });
    }
    return (
        <div id='nav-bar'>
            <h3 style={{marginLeft:'10px'}}>SWAG: ${props.balance}</h3>
            { 
                (props.currentList === 'STORE')?
                    <input style={{fontSize: '14px', padding: '10px'}} 
                                    placeholder='Search Item...'
                                    onChange={props.onChangeSearch}></input>
                                    : <div></div>
            }
            <div style={{display: 'flex', flexDirection: 'row-reverse', marginRight: '10px'}}>
                <button onClick={props.logOut}>Log out</button>
                <button onClick={() => {props.setCommentPage(commentPage => !commentPage)}} >Comments</button>
                {
                    (props.currentList === 'STORE') ?
                        <button onClick={goToCart}>My Orders</button> :
                        <button onClick={goToStore}>Go To Store</button>
                }
            </div>

        </div>);
}

export default NavBar;