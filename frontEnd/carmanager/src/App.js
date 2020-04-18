import React, { Component, Fragment } from 'react'
import { getCars } from './actions/car';
import { connect } from 'react-redux';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';

class App extends Component {




  render() {


    return (
      <Provider store={store}>
        <Fragment>
          <Home />
        </Fragment>
      </Provider>
    )
  }
}


export default App
