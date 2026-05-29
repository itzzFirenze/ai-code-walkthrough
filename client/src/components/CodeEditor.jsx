import Editor from '@monaco-editor/react';
import { useWalkthrough } from '../context/WalkthroughContext';

const CodeEditor = () => {
   const { code, setCode, language } = useWalkthrough()
   return (
      <div className='border border-zinc-700 rounded-xl overflow-hidden'>
         <Editor
            height={500}
            theme='vs-dark'
            language={language.toLowerCase()}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
               fontSize: 16,
               minimap: {
                  enabled: false
               },
               padding: {
                  top: 16
               },
               smoothScrolling: true
            }}
         />
      </div>
   )
}

export default CodeEditor