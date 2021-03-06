import { GET_CARS, GET_CAR_ID, ADD_CAR, EDIT_CAR, DELETE_CAR } from '../actions/types'


const initialState = {
    cars: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CARS:
            return {
                ...state,
                cars: action.payload
            }

        // if this is commented out then the prop state will not be updated after
        // a car has been added
        case ADD_CAR:
            return {
                ...state,
                cars: [...state.cars, action.payload]
            }

        default:
            return state;
    }



}