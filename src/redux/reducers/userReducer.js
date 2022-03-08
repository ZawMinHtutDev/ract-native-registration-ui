import { UPDATE_USER, RESET_USER } from "../constants";

const initialState = {
    userName: "",
    email: "",
    password: "",
    phoneNumber: ""
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign(state, action.payload);

        case RESET_USER:
            return initialState;
    
        default:
            return state;
    }
}