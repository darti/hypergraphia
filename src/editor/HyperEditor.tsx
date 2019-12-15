import { Editor, EditorState } from "draft-js"
import React from "react"

import { connect, ConnectedProps } from "react-redux"

import { HyperState, updateEditorState } from "./hyperEditorSlice"

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  editorState: EditorState
}

const mapDispatch = { updateEditorState }

const mapStateToProps = (state: HyperState) => ({
  editorState: state.editorState
})

const connector = connect(mapStateToProps, mapDispatch)

const HyperEditor = (props: Props) => {
  const [editorState, setEditorState] = React.useState(props.editorState)

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder="Enter some text..."
    />
  )
}

export default connector(HyperEditor)
