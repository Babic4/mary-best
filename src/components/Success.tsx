import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Success = () => {
  return (
    <Card className='relative mx-auto w-full max-w-sm pt-0'>
      <img
        src='https://artemonsalon.ru/wp-content/uploads/2020/11/95_oooo.plus_.png'
        alt='Event cover'
        className='relative z-20 aspect-4/3 w-full object-cover'
      />
      <CardHeader>
        <CardTitle>Опрос сохранён! Спасибо тебе ❤️</CardTitle>
        <CardDescription>
          Что есть такая красивая ✨, умная 🧠, добрая 💕 девушка во всем мире
          🌍
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <p className='text-muted-foreground'>
          По всем вопросам:{' '}
          <Button variant='link' className='p-0' asChild>
            <a href='https://t.me/l3Dima' target='_blank'>
              Telegram
            </a>
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}
