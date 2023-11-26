import ReactMarkdown from "react-markdown"

interface ReadMarkdownContainerProps {
  children: string
}

export function ReadMarkdownContainer({ children }: ReadMarkdownContainerProps) {
  return (
    <ReactMarkdown className="prose prose-invert max-w-none break-words prose-h1:text-brand-green-300 prose-h1:font-mono prose-h1:font-bold prose-img:rounded-xl prose-a:underline prose-a:underline-offset-4 prose-a:decoration-brand-blue-600 prose-a:transition-colors prose-a:font-normal hover:prose-a:text-brand-blue-600">
      {children}
    </ReactMarkdown>
  )
}