import ExplanationBox from '../components/ExplanationBox'
import ExecutionSteps from '../components/ExecutionSteps'
import CodeEditor from '../components/CodeEditor'
import Header from '../components/Header'
import LanguageSelector from '../components/LanguageSelector'
import ErrorMessage from '../components/ErrorMessage'
import GenerateButton from '../components/GenerateButton'
import { useWalkthrough } from '../context/WalkthroughContext'

const Home = () => {
   const {
      language,
      code,
      error,
      explanation,
      steps,
      setLanguage,
      setCode,
   } = useWalkthrough()

   return (
      <div className='min-h-screen bg-zinc-900 text-white flex-col items-center justify-center'>
         <ErrorMessage error={error} />
         <Header />
         <LanguageSelector language={language} setLanguage={setLanguage} />
         <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
         />
         <GenerateButton />

         {explanation && (
            <ExplanationBox explanation={explanation} />
         )}
         {steps.length > 0 && (
            <ExecutionSteps steps={steps} />
         )}
      </div>
   )
}

export default Home