import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(v = '') => updateCell(cell.id, v)}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click Me!'} />
      </div>
    </div>
  );
};

export default TextEditor;
