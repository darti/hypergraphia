import { EditorState } from "draft-js"
import PluginEditor, { EditorPlugin } from "draft-js-plugins-editor"
import "draft-js/dist/Draft.css"
import * as React from "react"
// import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin"

interface HyperEditorProps {}

const plugins: EditorPlugin[] = [
  // createMarkdownShortcutsPlugin()
]

class HyperEditor extends React.Component<HyperEditorProps, any> {
  private editor!: PluginEditor

  constructor(props: HyperEditorProps) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }

    this.setEditor = editor => {
      this.editor = editor
    }
  }

  public focusEditor() {
    if (this.editor) {
      this.editor.focus()
    }
  }

  public setEditor(editor: PluginEditor) {
    this.editor = editor
  }

  public componentDidMount() {
    this.focusEditor()
  }
  public handleChange(e: EditorState) {
    this.setState({ editorState: e })
  }

  public render() {
    const boundSetEditor = this.setEditor.bind(this)
    const boundHandleChange = this.handleChange.bind(this)
    const boundFocusEditor = this.focusEditor.bind(this)

    return (
      <div style={styles.editor} onClick={boundFocusEditor}>
        <PluginEditor
          ref={boundSetEditor}
          editorState={this.state.editorState}
          onChange={boundHandleChange}
          placeholder="Enter some text..."
          plugins={plugins}
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
