import Editor from '@monaco-editor/react'
import { useWalkthrough } from '../context/WalkthroughContext'

const CodeEditor = () => {
  const { code, setCode, language } = useWalkthrough()

  return (
    <div className='border border-[#2a2a2a] rounded overflow-hidden'>
      <div className='flex items-center justify-between px-3 py-2 border-b border-[#2a2a2a] bg-[#141414]'>
        <span className='text-xs font-mono text-[#555]'>editor</span>
        <span className='text-xs font-mono text-[#444]'>{language}</span>
      </div>
      <Editor
        height={420}
        theme='vs-dark'
        language={language.toLowerCase()}
        value={code}
        onChange={(value) => setCode(value || '')}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          minimap: { enabled: false },
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'none',
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
        }}
      />
    </div>
  )
}

export default CodeEditor