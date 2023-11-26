import { Variants, motion } from "framer-motion";

const transitionVariants: Variants = {
  initial: {
    x: '100%',
    width: '100%',
  },

  animate: {
    x: '0%',
    width: '0%',
  },

  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%']
  }
}

export function Transition() {
  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[999] bg-brand-blue-900"
        variants={transitionVariants}
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[998] bg-brand-blue-800"
        variants={transitionVariants}
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[997] bg-brand-blue-700"
        variants={transitionVariants}
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeInOut' }}
      />
    </>
  )
}