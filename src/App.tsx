import React from "react"
import "./App.css"
import { HyperEditor } from "./editor/HyperEditor"

import { Provider, connect } from "react-redux"
import { createStore } from "redux"
import { EditorState } from "draft-js"

const defaultState = {
  editorState: EditorState.createEmpty()
}

const reducer = (state = defaultState, { editorState, type }) => {
  if (type === "UPDATE_EDITOR_STATE") {
    return {
      ...state,
      editorState
    }
  }
  return state
}

const store = createStore(reducer)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HyperEditor />
    </Provider>
  )
}

export default App
