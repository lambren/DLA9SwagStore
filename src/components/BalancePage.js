import React, {useState} from 'react';

import NavBar from './NavBar';
import ListItem from './ListItem';


import Amazon from './../asset/Amazon.jpg';

import './../App.scss';
import CommentPage from './CommentPage';


const BalancePage = (props) => {

    const [currentList, setCurrentList] = useState('STORE');
    const [search, setSearch] = useState('');
    const [commentPage, setCommentPage] = useState(false);
    const onChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    const logOut = () =>
    {
        props.setRoute('LOGIN');
        props.setID('');
        props.setLogin('');
    }

    const selectList = () => 
    {
        switch(currentList) {
            case 'LOADING':
                return (<div className='loader'></div>)

            case 'CART':
                return(
                    <div id='list'>
                        {
                            props.cart.map(item => <ListItem user_id={props.user_id}
                                isStore={false} key={item.cart_id} item={item}/>)
                        }
                    </div>
                )
            
            default: 
                return(
                        <div id='list'>
                            {props.itemList.filter(item => item.swag_name.includes(search))
                                .map(item => 
                                    <ListItem user_id={props.user_id} 
                                        isStore={true} key={item.swag_item_id} item={item} 
                                        setCart={props.setCart} setSwag={props.setSwag} 
                                        setItemList={props.setItemList} setCurrentList={setCurrentList}>
                                    </ListItem>
                            )}
                        </div>
                        );
        }
    }

    return (
        <div>
            <NavBar currentList={currentList} 
                    logOut={logOut} 
                    setCurrentList={setCurrentList} 
                    balance={props.swag}
                    setCart={props.setCart}
                    setItemList={props.setItemList}
                    user_id={props.user_id}
                    onChangeSearch={onChangeSearch}
                    setSearch={setSearch}
                    setRoute={props.setRoute}
                    setCommentPage={setCommentPage}></NavBar>

            <div>
            {
                (commentPage) ? <CommentPage user_id = {props.user_id}/> : 
                <div id='main-screen'>
                    {selectList()}
                    <img src={Amazon} alt='Amazon Logo' width='320px' height='auto'/>
                </div>

            }
            </div>
        </div>);
}

export default BalancePage;