import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <div className="gap-4 whitespace-pre-wrap text-sm">
      <div className="block">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}

export default MarkdownRenderer
