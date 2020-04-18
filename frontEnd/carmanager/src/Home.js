import React, { Component } from 'react'
import { getCars, addCars } from './actions/car';
import { connect } from 'react-redux';
import axios from 'axios';
import store from './store'


class Home extends Component {


    state = {
        cars: ['cars']
    }

    componentDidMount() {
        this.props.getCars()





    }

    dispatchCars = () => {

        const newCar = {
            "make": "Dodge",
            "model": "Caravan",
            "year": 2003,
            "mileage": 250000

        }

        store.dispatch(addCars(newCar))
    }




    // axios.get('http://localhost:8000/api/cars/')
    //   .then((response => {
    //     console.log('response: ', response.data)

    //   }))

    // let response = await fetch('http://localhost:8000/api/cars/');
    // let data = await response.json()
    // console.log('data :', data)




    render() {
        console.log('render.. ', this.props.cars)

        return (
            <div>
                <p>{this.state.cars}</p>
                <p>working</p>
                <button onClick={this.dispatchCars}>Dispatch cars</button>

                {
                    this.props.cars.map(car => {
                        return <h1>{car.make}</h1>
                    })
                }

            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    cars: state.cars.cars
});

export default connect(mapStateToProps,
    { getCars, addCars })(Home)
