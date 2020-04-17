import React, { Component } from 'react'
import { getCars } from './actions/car';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.getCars();
  }

  componentDidUpdate() {
    console.log('logging', this.props.cars)
  }



  render() {

    return (
      <div>
        <p>working</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cars: state.cars
})

export default connect(mapStateToProps,
  { getCars })(App)
