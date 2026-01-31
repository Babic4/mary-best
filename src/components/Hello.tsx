import { motion } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { TextAnimate } from '@/components/ui/text-animate'
import { Button } from '@/components/ui/button'

export const Hello = ({ goVerify }: { goVerify: () => void }) => {
  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      <div>
        <TextAnimate
          animation='blurInUp'
          by='character'
          duration={2}
          className='text-xl text-center'
        >
          Привет, самая лучшая девушка!
        </TextAnimate>
        <TextAnimate
          animation='blurIn'
          by='character'
          duration={1.5}
          delay={2}
          className='text-base text-center text-red-400'
        >
          Люблю безумно
        </TextAnimate>
      </div>
      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.25, type: 'spring' }}
      >
        <Button onClick={goVerify}>
          Вперед <ArrowRightIcon />
        </Button>
      </motion.div>
    </div>
  )
}
