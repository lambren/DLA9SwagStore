import React, {useState} from 'react';
import {HOSTNAME} from './../Constants'
import Amazon from './../asset/Amazon.jpg'
import './../App.scss'


const LoginPage = (props) => {
    const [noMatch, setNoMatch] = useState(false);
    const closed = false;
    const [checking, setChecking] = useState(false);
  
    const onChangeLogin = (event) => {
      props.setLogin(event.target.value.toLowerCase());
    }

    const onSubmit = (event) => {
      event.preventDefault();
  
      setNoMatch(false);
      setChecking(true);
  
      fetch(HOSTNAME + 'swag-balance/' + props.login, {
        method: 'GET', })
        .then(res => res.json())
        .then(data => {
          setChecking(false);
  
          if (data.status === 'SUCCEED') {
            if (data.swag) props.setSwag(parseInt(data.swag,10));
            else props.setSwag(0);
            props.setCart(data.cart);
            props.setID(data.user_id);
            props.noPassword.current = data.noPassword;

            props.setRoute('PASSWORD');
          }
          else if (data.reason === 'NO_MATCH') 
          {
            setNoMatch(true);
          }
          else throw(new Error('FAILED'));
        })
        .catch(err => {
          setChecking(false);
          console.log(err)
        });
    }
    var message = '';

    const chooseClose = () => {
      if (closed){
        message = 'We are pleased to announce that the DLA9 SWAG Store has been RE-OPENED. Thank you all for your hard work!'
        return (<div><p>{message}</p></div>);
      }
      else 
      {
        message = 'We are pleased to announce that the DLA9 SWAG Store has been RE-OPENED. Thank you all for your hard work!';
        return(
          <div className="App" id='main-screen'>
          {
              ((checking) ? <div className='loader'/> :
              <div className='inner-screen'>
                <h1>Welcome, DLA9 SWAGGERS!</h1>
                <h1 style={{padding: '20px'}}>{message}</h1>
                <form className='my-form' onSubmit={onSubmit}>
                    <label htmlFor='login'>
                      Enter your login to begin
                    </label>
                    <input type='text' onChange={onChangeLogin}/>
                    <button onClick={onSubmit}>Submit</button>
                </form>
                    {(noMatch)? <h2>Sorry, I could not find your data, please provide your accurate login</h2> : <div/>}
                <img src={Amazon} alt='Amazon Logo' width='320px' height='auto'/>
              </div>
              )}
          </div>);
        }
    }
  
    return (
      <div className="App" id='main-screen'>
      {
        chooseClose()
      }
      </div>
    );
  
  // return (<div><p>{message}</p></div>);
   
}



export default LoginPage;