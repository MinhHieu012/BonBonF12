import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import combineReducers from "./src/store"
import rootSaga from "./src/saga"

const sagaMiddleware = new createSagaMiddleware();

const store = configureStore({
    reducer: combineReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store