import {configureStore} from "@reduxjs/toolkit"
import createSagaMiddleware  from "redux-saga"
import rootReducer from "./src/store"
import rootSaga from "./src/saga"

const sagaMiddleware = new createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store