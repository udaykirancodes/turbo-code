import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useEffect, useRef } from "react";
import { useSidebar } from "../ui/sidebar";

export default function PlayGround() {
  const { state } = useSidebar();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Handle editor mounting
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  // Update editor layout when sidebar state changes
  useEffect(() => {
    if (editorRef.current) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        editorRef.current?.layout();
      }, 0);
    }
  }, [state]);
  return (
    <div className="h-full w-full grid  gap-4">
      <Editor
        defaultLanguage="javascript"
        defaultValue="// Your code here"
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}
