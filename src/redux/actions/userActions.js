import { UPDATE_USER, RESET_USER } from "../constants";

export const updateUser = (payload) => {
    return {
        type: UPDATE_USER,
        payload
    }
}

export const resetUser = () => {
    return {
        type: RESET_USER
    }
}