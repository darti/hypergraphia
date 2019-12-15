import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EditorState } from "draft-js"

export interface HyperState {
  editorState: EditorState
}

const initialState: HyperState = {
  editorState: EditorState.createEmpty()
}

const { actions, reducer } = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateEditorState(
      state: HyperState,
      action: PayloadAction<EditorState>
    ): HyperState {
      return { ...state, editorState: action.payload }
    }
  }
})

export const { updateEditorState } = actions

export default reducer
