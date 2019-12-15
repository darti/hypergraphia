import React from "react"
import "./App.css"
import HyperEditor from "./editor/HyperEditor"

import { combineReducers } from "@reduxjs/toolkit"

import { Provider } from "react-redux"

import { configureStore } from "@reduxjs/toolkit"
import reducer from "./editor/hyperEditorSlice"

const rootReducer = combineReducers({
  editor: reducer
})
export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HyperEditor />
    </Provider>
  )
}

export default App
