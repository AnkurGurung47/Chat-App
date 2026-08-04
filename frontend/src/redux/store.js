// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './userSlice.js'
// import socketReducer from './socketSlice.js'
// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     socket: socketReducer,
//   },
// })

// export default store
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import socketReducer from './socketSlice'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Persist only the user slice
}

const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export default store
