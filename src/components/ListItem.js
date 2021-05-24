import React, {useState, createRef} from 'react';

import {useAlert} from 'react-alert';

import {HOSTNAME} from './../Constants'

const ListItem = (props) => {
    const alert = useAlert();

    const inputRef = createRef();

    const [confirming, setConfirming] = useState(false);

    const [quantity, setQuantity] = useState(0);

    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);

    }

    const onCartAdd = () => {
        if (quantity === 0) return 0;
        props.setCurrentList('LOADING');
        fetch(HOSTNAME + 'add-to-cart', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referredPolicy: 'no-referrer',
            body: JSON.stringify({
                user_id: props.user_id,
                swag_item_id: props.item.swag_item_id,
                quantity,
            })
        }).then(res => res.json())
        .then(data => {
            if (data.status === 'SUCCESS')
            {    
                console.log('SUCCESS');
                props.setItemList(data.store);
                props.setSwag(data.swag);
                alert.success('Order is placed. We will try our best to deliver it asap!')
            }
            else if (data.reason !== 'CLOSED') {
                console.log('FAILED');
                alert.error('Im Sorry. Your Order Was not placed. Please check your balance and the availbility of the item!')
            } else alert.error('The SWAG Store is currently Closed! Please stay tuned for any updates! We are sorry for any inconvenience!')
            props.setCurrentList('STORE');
        }).catch(err => {
            alert.error('Connection to the server lost! Please check your internet connection!')
            props.setCurrentList('STORE');
        });

        inputRef.current.value = '';
        setQuantity(0);
    }


    const selectMessage = (status) => {
        switch (status) 
        {
            case 'PROCESSING':
                return ('We are processing your order! Please check back in 1-2 days for your order status.')
            case 'DELIVERED':
                return ('Thank you for your purchase! Your order has been delivered!')            
            case 'RECEIVED':
                return ('We received your order, and we are trying our best to fulfill it. Please check back later in 1 or 2 days. Thank you for your patience!')
            case 'FULFILLED':
                return ('We have fulfilled your order, and your items are now in the Swag Cage. You can tell a Manager to get it to you!')
            case 'BACKORDERED':
                return ('We are sorry, but rest assured that your items are on its way. Please check back later. Thank you for your patience!')
            case 'CANCELLED':
                return ('Your order has been cancelled, and you have been refunded the money for this order.')
            default: return('');
        }
    }

    return(
        <div id='list-item' style={(confirming)? {transform: 'scale(1.2)', border: '2px solid gray'} : {}}>
            <h3>{props.item.swag_name}</h3>
            <img width='200' height='200' src={props.item.swag_image} alt='swag_item_image'></img>
            {(props.isStore) ? 
                <div>
                    <label>Price: ${props.item.price}  </label>
                    <label>Stock: {props.item.stock}</label>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <label>Quantity: </label>
                        <input ref={inputRef} placeholder='0' onChange={onChangeQuantity}></input>
                    </div>
                    {
                        (!confirming) ? 
                        <button onClick={() => setConfirming(true)}>Order Now!</button> :
                        <div>
                            <h4 id='confirm-message'>I would like to order this item</h4>
                            <button className='no-button'
                                onClick={()=>setConfirming(false)}>NO</button>
                            <button className='yes-button'
                                onClick={() => {
                                    setConfirming(false);
                                    onCartAdd();
                                    }}>CONFIRM</button>
                        </div>
                    }   
                </div> :
                <div style={{margin: '10px'}}>
                    <p>Quantity: {props.item.quantity}</p>
                    <p>Status: {props.item.status}</p>
                    <p>{selectMessage(props.item.status)}</p>
                </div>
                
            }
        </div>)
}

export default ListItem;