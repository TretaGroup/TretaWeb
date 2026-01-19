'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Puzzle, Rocket } from 'lucide-react'

export type Step = {
  id: string
  title: string
  desc: string
  icon?: any
}

interface Props {
  steps?: Step[]
}

const defaultSteps: Step[] = [
  { id: '01', title: 'Discover & Diagnose', desc: 'We begin by deeply understanding your organization’s unique challenges, opportunities, and goals', icon: Search },
  { id: '02', title: 'Strategize & Plan', desc: 'With insights in hand, we co-create a tailored strategy that aligns with your business objectives.', icon: Puzzle },
  { id: '03', title: 'Implement & Optimize', desc: 'Put the strategy into action and refine continuously for measurable results.', icon: Rocket },
]

const OurProcess = ({ steps = defaultSteps }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  /** TRACK ONLY THE TIMELINE SCROLL, NOT THE SECTION */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start center', 'end 90%'], // Keeps line from finishing too early
  })

  /** Animate filled line height */
  const heightTransform = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  /** Intersection observer for what step is active */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'))
            setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.5 } // perfect sweet spot
    )

    stepRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 bg-secondary transition-colors">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12">

        {/* LEFT STATIC PANEL */}
        <div className="lg:w-1/2 md:sticky top-28 h-fit">
          <p className="text-sm text-primary font-semibold mb-1 tracking-wide">[Our Process]</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
            Step-by-Step to <br />
            <span className="italic text-primary">Business Growth</span>
          </h2>
          <p className="mt-4 text-lg text-foreground max-w-md">
            How we turn strategy into measurable success
          </p>

          {/* Progress Counter */}
          <div className="mt-6 text-primary font-medium">
            Step <span className="font-bold">{activeIndex + 1}</span> of {steps.length}
          </div>
        </div>

        {/* RIGHT SCROLL TIMELINE */}
        <div className="lg:w-1/2 relative" ref={wrapperRef}>
          {/* Base line */}
          <div className="hidden lg:block absolute left-6 top-0 bottom-0 w-px bg-primary/20" />

          {/* Animated fill line */}
          <motion.div
            style={{ height: heightTransform }}
            className="hidden lg:block absolute left-6 top-0 w-px bg-primary  origin-top"
          />

          <div className="space-y-20">
            {steps.map((step, idx) => {
              const Icon = step.icon ?? Search
              const isActive = idx === activeIndex

              return (
                <motion.div
                  key={idx}
                  ref={(el) => { stepRefs.current[idx] = el }}
                  data-idx={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
                  className="flex items-start gap-6"
                >
                  {/* Number Badge */}
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-md transition-all bg-primary text-white scale-110`}
                    >
                      {step.id}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-2xl p-6 w-full border transition-all  bg-background border-gray-300 shadow-xl`}
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 transition-all bg-primary/20`}
                    >
                      <Icon className={`w-6 h-6 text-primary`} />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                    <p className="text-foreground mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurProcess
