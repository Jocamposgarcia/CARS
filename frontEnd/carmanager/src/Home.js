import React, { Component } from 'react'
import { getCars, addCars, editCar, deleteCar } from './actions/car';
import { connect } from 'react-redux';
import axios from 'axios';
import store from './store'

import { AgGridReact, AgGridColumn } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

class Home extends Component {

    state = {
        columnDefs: [
            { headerName: 'Make', field: 'make', editable: true, checkboxSelection: true },
            { headerName: 'Model', field: 'model', editable: true },
            { headerName: 'Year', field: 'year', editable: true },
            { headerName: 'Mileage', field: 'mileage', editable: true }
        ],
        rowData: null
    }

    async componentDidMount() {
        await this.props.getCars();
        this.setState({ rowData: this.props.cars })

    }

    changeColumns = () => {
        this.setState({
            columnDefs: [
                { headerName: 'Make11', field: 'make', editable: true, checkboxSelection: true },
                { headerName: 'Model', field: 'model', editable: true },
                { headerName: 'Year', field: 'year', editable: true },
                { headerName: 'Mileage', field: 'mileage', editable: true }
            ]
        })

    }

    onButtonClick = e => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        console.log(selectedNodes)
    }

    editCars = () => {
        const newCar = {
            "make": "Dodge4",
            "model": "Caravan4",
            "year": 2000,
            "mileage": 2000
        }

        this.props.editCar(81, newCar)
    }

    addCar = () => {
        const newCar = {
            "make": "newCar",
            "model": "BMW",
            "year": 2020,
            "mileage": 2000
        }
        this.props.addCars(newCar)
    }

    onGridReady = (params) => {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }






    render() {
        console.log('render.. ', this.props.cars)

        return (
            <React.Fragment>
                <button onClick={this.addCar}>Add new car</button>
                <button onClick={this.editCars}>Edit car with id 2</button>
                <button onClick={this.changeColumns}>Edit column defs</button>
                <button onClick={this.onButtonClick}>Get selected rows</button>
                <div className="ag-theme-balham" style={{ height: '200px', width: '800px' }}>

                    <AgGridReact
                        onGridReady={params => this.gridApi = params.api}
                        enableSorting={true}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                        {/* <AgGridColumn headerName='Make' field='make' editable={true} checkboxSelection={true}></AgGridColumn>
                        <AgGridColumn headerName='Model' field='model' editable={true} ></AgGridColumn>
                        <AgGridColumn headerName='Year' field='year' editable={true} ></AgGridColumn>
                        <AgGridColumn headerName='Mileage' field='mileage' editable={true} ></AgGridColumn> */}





                    </AgGridReact>
                </div>
            </React.Fragment>
        )
    }
}



const mapStateToProps = (state) => ({
    cars: state.cars.cars
});

export default connect(mapStateToProps,
    { getCars, addCars, editCar, deleteCar })(Home)






        // let result = Promise.resolve(store.dispatch(addCars(newCar)))
        //     .then(() => { console.log(this.props.cars) })


    // axios.get('http://localhost:8000/api/cars/')
    //   .then((response => {
    //     console.log('response: ', response.data)

    //   }))

    // let response = await fetch('http://localhost:8000/api/cars/');
    // let data = await response.json()
    // console.log('data :', data)


    // state = {
    //     cars: ['cars']
    // }

    // componentDidMount() {
    //     this.props.getCars()
    // }

    // editCars = () => {
    //     const newCar = {
    //         "make": "111",
    //         "model": "Caravan",
    //         "year": 2000,
    //         "mileage": 2000
    //     }

    //     this.props.editCar(80, newCar)


    // }

    // deleteCar = () => {
    //     this.props.deleteCar(2)

    // }

    // dispatchCars = () => {

    //     const newCar = {
    //         "make": "Dodge",
    //         "model": "Caravan",
    //         "year": 2003,
    //         "mileage": 250000


    //     }

    //     this.props.addCars(newCar)
    //     console.log(this.props.cars)

    // }


    // dispatchCars1 = () => {

    //     const newCar = {
    //         "make": "Dodge",
    //         "model": "Caravan",
    //         "year": 2003,
    //         "mileage": 250000

    //     }



    //     store.dispatch(addCars(newCar))



    // }



    // return (
    //     <div>
    //         <p>{this.state.cars}</p>
    //         <p>working</p>
    //         <button onClick={this.dispatchCars}>this.props.addCars(newCar)</button>
    //         <br />
    //         <button onClick={this.dispatchCars1}>store.dispatch(newCar)</button>
    //         <br />
    //         <button onClick={this.editCars}>Edit car with id 2</button>
    //         <br />
    //         <button onClick={this.deleteCar}>Delete car with id2</button>


    //         {
    //             this.props.cars.map(car => {
    //                 return <h1>{car.make}</h1>
    //             })
    //         }

    //     </div >
    // )
