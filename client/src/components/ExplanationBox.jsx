import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const ExplanationBox = ({ explanation }) => {
   return (
      <div className="mt-8 bg-zinc-800 border border-zinc-700 rounded-xl p-6 overflow-hidden">
         <Markdown
            components={{
               code(props) {
                  const { children, className, ...rest } = props
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                     <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={dark}
                        customStyle={{
                           background: 'transparent',
                           backgroundColor: '#27272a', // zinc-800
                           margin: '0',
                           borderRadius: '0.5rem',
                           overflowX: 'auto',
                        }}
                        codeTagProps={{
                           style: { background: 'transparent' }
                        }}
                     />
                  ) : (
                     <code {...rest} className={`bg-zinc-700 px-1 rounded ${className}`}>
                        {children}
                     </code>
                  )
               }
            }}
         >
            {explanation}
         </Markdown>
      </div>
   )
}

export default ExplanationBox