import { convertToRaw, Editor, EditorState } from "draft-js"
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

class HyperEditor extends React.Component<Props, HyperState> {
  private updateEditorState: any
  constructor(props: Props) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }
    this.updateEditorState = props.updateEditorState
  }

  public render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange.bind(this)}
        placeholder="Enter some text..."
      />
    )
  }

  protected onChange(editorState: EditorState) {
    this.setState({ editorState })
    const rawState = convertToRaw(editorState.getCurrentContent())
    this.updateEditorState(rawState)
  }
}

export default connector(HyperEditor)
