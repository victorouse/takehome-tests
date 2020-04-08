import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'

import rootReducer from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const middleware = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(rootReducer, middleware)

sagaMiddleware.run(sagas)

export const persistor = persistStore(store)
export default store
