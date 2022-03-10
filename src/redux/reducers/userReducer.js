import { UPDATE_USER, RESET_USER } from "../constants";

const initialState = {
    id: null,
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign(state, action.payload);

        case RESET_USER:
            return {
                id: null,
                userName: "",
                email: "",
                password: "",
                phoneNumber: "",
            };

        default:
            return state;
    }
};
