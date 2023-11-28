import { IMarkdownEditor } from '@uiw/react-markdown-editor';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

interface MdEditorProps extends IMarkdownEditor { }

export function MdEditor({ className, ...props }: MdEditorProps) {
  return (
    <MarkdownEditor className={`p-4 min-h-[300px] ${className}`} {...props} />
  );
}