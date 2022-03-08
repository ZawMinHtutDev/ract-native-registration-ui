import { createStore, combineReducers } from "redux";
import { UserReducer } from "./reducers";

const rootReducer = combineReducers({
    User: UserReducer
});

export const store = createStore(rootReducer);