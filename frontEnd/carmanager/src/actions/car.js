import { GET_CARS, GET_CAR_ID, ADD_CAR, EDIT_CAR, DELETE_CAR } from './types'
import axios from 'axios';



export const getCars = () => (dispatch) => {
    var response = axios.get('http://localhost:8000/api/cars/')
        .then((resp) => {

            dispatch({
                type: GET_CARS,
                payload: resp.data

            })
        })
    return response
};


export const addCars = (car) => (dispatch) => {
    var response = axios.post('http://localhost:8000/api/cars/', car)
        .then((resp) => {
            dispatch({
                type: ADD_CAR,
                payload: resp.data
            })
        })
};

export const editCar = (carId, car) => dispatch => {
    axios.put(`http://localhost:8000/api/cars/${carId}/`, car)
        .then(resp => {
            dispatch({
                type: EDIT_CAR,
                payload: resp.data
            })
        })
}

export const deleteCar = (id) => dispatch => {
    axios.delete(`http://localhost:8000/api/cars/${id}/`)
        .then(resp => {
            dispatch({
                type: DELETE_CAR,
                payload: id
            })
        })
}

