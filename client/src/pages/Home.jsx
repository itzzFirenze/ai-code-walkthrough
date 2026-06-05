import ExplanationBox from '../components/ExplanationBox'
import CodeEditor from '../components/CodeEditor'
import Header from '../components/Header'
import LanguageSelector from '../components/LanguageSelector'
import ErrorMessage from '../components/ErrorMessage'
import GenerateButton from '../components/GenerateButton'
import { useWalkthrough } from '../context/WalkthroughContext'
import Layout from '../components/Layout'
import TraceViewer from '../components/TraceViewer'
import VariableTable from '../components/VariableTable'

const Home = () => {
  const { trace, output } = useWalkthrough()

  return (
    <Layout>
      <div className='min-h-screen bg-[#0e0e0e] text-[#e8e8e8]'>
        <div className='max-w-4xl mx-auto px-6 py-10'>
          <ErrorMessage />
          <Header />
          <div className='mt-8 space-y-4'>
            <LanguageSelector />
            <CodeEditor />
            <GenerateButton />
          </div>
          <ExplanationBox />
          <TraceViewer trace={trace} output={output} />
        </div>
      </div>
    </Layout>
  )
}

export default Home