import React from 'react';
import {Link,Switch,BrowserRouter,Route} from 'react-router-dom'
import ListATM from './components/ListATM'
import GetLocation from './components/GetLocation'
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='navBar'>
          <h2 className='appHeader'>ATM Finder</h2>
          <Link className='appLink' to='/'>Home</Link>
        </div>
        <Switch>
          <Route path = '/' component={GetLocation} exact={true}/>
          <Route path = '/list' component={ListATM}/>
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
