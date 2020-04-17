import { GET_CARS, GET_CAR_ID, ADD_CAR, EDIT_CAR, DELETE_CAR } from './types'
import axios from 'axios';

export const getCars = () => (dispatch) => {
    axios.get('http://localhost:8000/api/cars/')
        .then((resp) => {
            dispatch({
                type: GET_CARS,
                payload: resp.data
            })
        })
};



