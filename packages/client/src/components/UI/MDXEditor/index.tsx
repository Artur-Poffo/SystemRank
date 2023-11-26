"use client"
// InitializedMDXEditor.tsx
import {
  MDXEditor,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  type MDXEditorMethods,
  type MDXEditorProps
} from "@mdxeditor/editor";
import { linkPlugin } from '@mdxeditor/editor/plugins/link';
import type { ForwardedRef } from "react";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        tablePlugin()
      ]}
      {...props}
      ref={editorRef}
    />
  );
}