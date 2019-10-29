import React from 'react';
import logo from '../assets/images/logo.png';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login  from './components/login';
import SignUpSeller from './components/signup-seller';
import SignUpBuyer from './components/signup-buyer';
import BuyerMain from './components/buyer/buyer_main';
import SellerMain from './components/seller/seller_main';
import Loader from './components/loader';
import Messages from './components/messages';

class App extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
        loading: true
     }
  }
  componentDidMount() {
      setTimeout(() => {
        this.setState({
           loading: false
        })
      },800)
  }
  render() {
    if(this.state.loading) {
      return (
        <img src={logo} alt="logo"/>
      )
    } else {
      return (
        <div style={{width: "100%"}}>
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/login" />
            )} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup-buyer" component={SignUpBuyer} />
            <Route exact path="/signup-seller" component={SignUpSeller} />
            <Route path="/buyer" component={BuyerMain} />
            <Route path="/seller" component={SellerMain} />
          </Switch>
          <Loader/>
          <Messages/>
        </div>
      )
    }
  }
}

export default App;
