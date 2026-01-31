import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRightIcon } from '@phosphor-icons/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Field, FieldLabel } from '@/components/ui/field'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import supabase from '@/supabase-client'

const questions = [
  {
    id: 1,
    question: 'Модель',
    value: 'model',
    variants: ['17', '17 Pro', '17 Pro Max'],
  },
  {
    id: 2,
    question: 'Память',
    value: 'memory',
    variants: ['256GB', '512GB', '1TB', '2TB'],
  },
  {
    id: 3,
    question: 'Цвет',
    value: 'color',
    variants: ['Blue', 'Silver', 'Orange'],
  },
]

export const Quiz = ({ goSuccess }: { goSuccess: () => void }) => {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [answers, setAnswers] = useState({
    model: '17',
    memory: '256GB',
    color: 'Blue',
  })

  const progress = (100 / questions.length) * step

  const activeQuestion = questions[step - 1]

  const changeAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.value]: value,
    }))
  }

  const goNext = async () => {
    if (step === 3) {
      const userAgent = navigator.userAgent
      setIsLoading(true)
      try {
        const { error } = await supabase
          .from('answers')
          .insert({ data: answers, userAgent })

        if (error) {
          toast.error(`Ошибка: ${error.message}`)
          return
        }

        goSuccess()
      } catch (err) {
        toast.error('Ошибка сети. Попробуйте позже.')
      } finally {
        setIsLoading(false)
      }
    } else {
      setStep((prev) => ++prev)
    }
  }

  return (
    <Card className='mx-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Небольшой опрос</CardTitle>
        <CardDescription>Ответьте на вопрос правильно.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor='progress' className='text-xs text-primary/60'>
            <span>Прогресс</span>
            <span className='ml-auto'>
              {step} из {questions.length}
            </span>
          </FieldLabel>
          <Progress id='progress' value={progress} className='mb-4 h-2' />
        </Field>
        <RadioGroup className='gap-4'>
          <div>
            <div>{activeQuestion.question}:</div>
            <RadioGroup
              key={activeQuestion.id}
              defaultValue={activeQuestion.variants[0]}
              className='w-fit mt-2'
              onValueChange={changeAnswer}
            >
              {activeQuestion.variants.map((variant) => (
                <div key={variant} className='flex items-center gap-3'>
                  <RadioGroupItem value={variant} id={variant} />
                  <Label htmlFor={variant} className='cursor-pointer'>
                    {variant}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className='flex items-center justify-end'>
        <Button onClick={goNext} disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner /> Идет отправка
            </>
          ) : step === 3 ? (
            <>Завершить</>
          ) : (
            <>
              Дальше <ArrowRightIcon />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
