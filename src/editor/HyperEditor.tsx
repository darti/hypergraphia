import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftHandleValue,
  Modifier
} from "draft-js"
import "draft-js/dist/Draft.css"
import * as React from "react"
// import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin"

interface HyperEditorProps {}

class HyperEditor extends React.Component<HyperEditorProps, any> {
  private editor!: Editor

  private boundSetEditor: (editor: Editor) => void
  private boundFocusEditor: () => void
  private boundHandleChange: (editorState: EditorState) => void
  private boundHandleKeyCommand: (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => DraftHandleValue

  private boundHandleBeforeInput: (
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number
  ) => DraftHandleValue

  constructor(props: HyperEditorProps) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }

    this.boundSetEditor = this.setEditor.bind(this)
    this.boundHandleChange = this.handleChange.bind(this)
    this.boundFocusEditor = this.focusEditor.bind(this)
    this.boundHandleKeyCommand = this.handleKeyCommand.bind(this)
    this.boundHandleBeforeInput = this.handleBeforeInput.bind(this)
  }

  public focusEditor() {
    if (this.editor) {
      this.editor.focus()
    }
  }

  public setEditor(editor: Editor) {
    this.editor = editor
  }

  public componentDidMount() {
    this.focusEditor()
  }

  public handleChange(editorState: EditorState) {
    this.setState({ editorState })
  }

  public handleKeyCommand(
    command: DraftEditorCommand,
    editorState: EditorState
  ): DraftHandleValue {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      this.handleChange(newState)
      return "handled"
    }

    return "not-handled"
  }

  public handleBeforeInput(
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number
  ): DraftHandleValue {
    if (chars.startsWith("*")) {
      this.handleKeyCommand("bold", editorState)
      return "handled"
    }

    if (chars.startsWith("#")) {
      this.handleChange(RichUtils.toggleBlockType(editorState, "header-one"))
      return "handled"
    }

    return "not-handled"
  }

  public render() {
    return (
      <div style={styles.editor} onClick={this.boundFocusEditor}>
        <Editor
          ref={this.boundSetEditor}
          editorState={this.state.editorState}
          onChange={this.boundHandleChange}
          handleKeyCommand={this.boundHandleKeyCommand}
          handleBeforeInput={this.boundHandleBeforeInput}
          placeholder="Enter some text..."
        />
      </div>
    )
  }
}

const styles = {
  editor: {
    border: "1px solid gray",
    minHeight: "6em"
  }
}

export { HyperEditor }
