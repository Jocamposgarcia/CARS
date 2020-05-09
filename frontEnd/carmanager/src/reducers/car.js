import { GET_CARS, GET_CAR_ID, ADD_CAR, EDIT_CAR, DELETE_CAR } from '../actions/types'


const initialState = {
    cars: [],
    counter: 0,
    carsCopy: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_CARS:
            return {
                ...state,
                cars: action.payload,
                carsCopy: action.payload
            };

        // if this is commented out then the prop state will not be updated after
        // a car has been added
        case ADD_CAR:
            return {
                ...state,
                cars: [...state.cars, action.payload],
            };

        case EDIT_CAR:
            console.log('EDIT_CAR REDUCER.')
            return {
                ...state,
                cars: state.cars.map(car => car.id === action.payload.id ? action.payload : car),
                counter: state.counter + 1

            };


        case DELETE_CAR:
            return {
                ...state,
                cars: state.cars.filter(car => car.id !== action.payload)
            };


        default:
            return state;
    }



}