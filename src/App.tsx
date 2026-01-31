import { useState, useLayoutEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'

import { Hello } from '@/components/Hello'
import { Verify } from '@/components/Verify'
import { Quiz } from '@/components/Quiz'
import { Success } from '@/components/Success'

export function App() {
  const [step, setStep] = useState('success')

  const goVerify = () => setStep('verify')
  const goQuiz = () => setStep('quiz')
  const goSuccess = () => {
    localStorage.setItem('mary_answer', 'true')
    setStep('success')
  }

  useLayoutEffect(() => {
    const quizPassed = localStorage.getItem('mary_answer')

    if (quizPassed === 'true') {
      setStep('success')
    }
  }, [])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      {
        {
          hello: <Hello goVerify={goVerify} />,
          verify: <Verify goQuiz={goQuiz} />,
          quiz: <Quiz goSuccess={goSuccess} />,
          success: <Success />,
        }[step]
      }
      <Toaster position='top-center' theme='light' richColors />
    </div>
  )
}

export default App
