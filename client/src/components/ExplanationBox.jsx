import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useWalkthrough } from '../context/WalkthroughContext'

const ExplanationBox = () => {
   const { explanation } = useWalkthrough()

   if (!explanation) return null

   return (
      <div className='mt-8'>
         <div className='flex items-center gap-3 mb-3'>
            <span className='text-xs font-mono text-[#555] uppercase tracking-widest'>explanation</span>
            <div className='flex-1 border-t border-[#1e1e1e]' />
         </div>
         <div className='border border-[#2a2a2a] rounded bg-[#111] p-5'>
            <div className='prose prose-sm max-w-none font-mono text-[13px] leading-relaxed text-[#c8c8c8]
          [&_h1]:text-[#e8e8e8] [&_h1]:text-base [&_h1]:font-semibold [&_h1]:mb-3 [&_h1]:mt-5
          [&_h2]:text-[#e8e8e8] [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:mt-4
          [&_h3]:text-[#e8e8e8] [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3
          [&_p]:mb-3 [&_p]:last:mb-0
          [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-3
          [&_li]:pl-4 [&_li]:relative [&_li]:mb-1 [&_li]:before:content-["–"] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[#444]
          [&_strong]:text-[#e8e8e8] [&_strong]:font-semibold
          [&_a]:text-[#7eafd4] [&_a]:no-underline [&_a]:hover:underline
        '>
               <Markdown
                  components={{
                     code(props) {
                        const { children, className, ...rest } = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                           <SyntaxHighlighter
                              {...rest}
                              PreTag='div'
                              language={match[1]}
                              style={vscDarkPlus}
                              customStyle={{
                                 background: '#0e0e0e',
                                 border: '1px solid #2a2a2a',
                                 borderRadius: '4px',
                                 margin: '12px 0',
                                 padding: '12px 16px',
                                 fontSize: '13px',
                                 overflowX: 'auto',
                              }}
                              codeTagProps={{ style: { background: 'transparent', fontFamily: 'inherit' } }}
                           />
                        ) : (
                           <code
                              {...rest}
                              className={`bg-[#1a1a1a] border border-[#2a2a2a] px-1.5 py-0.5 rounded text-[#d4a96a] text-[12px] ${className || ''}`}
                           >
                              {children}
                           </code>
                        )
                     }
                  }}
               >
                  {explanation}
               </Markdown>
            </div>
         </div>
      </div>
   )
}

export default ExplanationBox