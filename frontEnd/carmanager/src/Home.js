import React, { Component } from 'react'
import { getCars } from './actions/car';
import { connect } from 'react-redux';
import axios from 'axios';


class Home extends Component {


    state = {
        cars: ['cars']
    }

    async componentDidMount() {
        this.props.getCars()





    }




    // axios.get('http://localhost:8000/api/cars/')
    //   .then((response => {
    //     console.log('response: ', response.data)

    //   }))

    // let response = await fetch('http://localhost:8000/api/cars/');
    // let data = await response.json()
    // console.log('data :', data)




    render() {


        return (
            <div>
                <p>{this.state.cars}</p>
                <p>working</p>

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
    { getCars })(Home)
