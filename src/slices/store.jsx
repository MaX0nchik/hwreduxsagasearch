import { configureStore } from "@reduxjs/toolkit";
import skillsSlice from './skills.js'
import createSagaMiddleware from "redux-saga";
import saga from "../saga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        skills: skillsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
    })

    sagaMiddleware.run(saga)

    export default store;