import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useWalkthrough } from '../context/WalkthroughContext';

const ExplanationBox = () => {
   const { explanation } = useWalkthrough()

   return (
      <div className="mt-2 bg-zinc-800 border border-zinc-700 rounded-xl p-2 overflow-hidden">
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
                           backgroundColor: '#27272a',
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