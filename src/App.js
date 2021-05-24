import React, {useState, useEffect, useRef} from 'react';

import './App.scss';

import LoginPage from './components/LoginPage'
import BalancePage from './components/BalancePage'
import Password from './components/Password'
import CommentsPage from './components/CommentPage'

import {useAlert} from 'react-alert';

import {HOSTNAME} from './Constants.js';



function App() {
  const alert = useAlert();

  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState('');
  const [user_id, setUserID] = useState('');

  const noPassword = useRef(true);

  const [route, setRoute] = useState('LOGIN');
  const [swag, setSwag] = useState(0);

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetch(HOSTNAME + 'get-list-of-swag/')
    .then(res => res.json())
    .then(data => {
      setItemList(data.swag_items);
    }).catch(err => {
      alert.error('cannot connect to server, check you internet connection!');
    });
  }, [alert]);

  const determineRoute = () => {
    switch(route) {
      case 'ORDER': return(<BalancePage swag={swag} setSwag={setSwag}
                                      route={route} setRoute={setRoute}
                                      setID={setUserID} user_id={user_id}
                                      itemList={itemList} setItemList={setItemList}
                                      setCart={setCart} cart={cart}
                                      login={login} setLogin={setLogin}>
                              </BalancePage>);

      case 'PASSWORD': return(<Password noPassword={noPassword}
                                        user_id={user_id}
                                        setRoute={setRoute}></Password>)

      default: return(<LoginPage setRoute={setRoute}
                                setSwag={setSwag}
                                setID={setUserID}
                                setCart={setCart}
                                login={login} setLogin={setLogin}
                                noPassword={noPassword}>
                        </LoginPage>);
    }
  }
  return (
    <div>
      {determineRoute()}
    </div>
  )
}

export default App;