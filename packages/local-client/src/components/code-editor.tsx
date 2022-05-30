import './code-editor.css';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const CodeEditor: React.FC<Props> = (props) => {
  const onEditorChange = (code: string | undefined) =>
    props.onChange(code || '');

  const onFormatClick = () => {
    const formattedCode = prettier
      .format(props.value, {
        parser: 'babel',
        plugins: [parserBabel],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    props.onChange(formattedCode);
  };

  return (
    <div className="editor-wrapper">
      <button
        onClick={onFormatClick}
        className="button button-format is-primary is-small"
      >
        format
      </button>
      <MonacoEditor
        theme="vs-dark"
        height="100%"
        defaultLanguage="javascript"
        defaultValue=""
        value={props.value}
        onChange={onEditorChange}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
