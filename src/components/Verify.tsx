import { useState } from 'react'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FingerprintIcon } from '@phosphor-icons/react'
import { Field, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const ANSWER = 'Tonka'

export const Verify = ({ goQuiz }: { goQuiz: () => void }) => {
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const verify = () => {
    setError(false)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (answer === ANSWER) {
        toast.success('Правильный ответ')
        goQuiz()
      } else {
        toast.error('Неверный ответ!')
        setError(true)
      }
    }, 1500)
  }

  return (
    <Card className='mx-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Верификация на самую лучшую</CardTitle>
        <CardDescription>Ответьте на вопрос правильно.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field aria-invalid={error}>
          <Input
            id='input-demo-api-key'
            type='text'
            placeholder='Ответ'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            aria-invalid={error}
          />
          <FieldDescription>Подсказка: Cola</FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          onClick={verify}
          disabled={!answer.length || isLoading}
        >
          {isLoading ? (
            <>
              <Spinner /> Идет проверка
            </>
          ) : (
            <>
              Проверить <FingerprintIcon />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
