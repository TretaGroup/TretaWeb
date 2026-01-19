'use client'

import ServiceCard from '@/components/services/serviceCards'
import {
  FileText,
  ShieldCheck,
  Puzzle,
  Lightbulb,
  Rocket,
} from 'lucide-react'

const services = [
  {
    title: 'Wealth & Finance',
    description:
      'Our Strategy Consulting service empowers businesses to define a clear path forward, refine their focus.',
    slug: 'wealth-finance',
    icon: FileText,
  },
  {
    title: 'Risk Assessment',
    description:
      'Our Risk Assessment service empowers organizations to uncover hidden risks, and strengthen resilience.',
    slug: 'risk-assessment',
    icon: ShieldCheck,
  },
  {
    title: 'Talent Strategy',
    description:
      'Our Talent Strategy service empowers organizations to optimize their people and foster engagement.',
    slug: 'talent-strategy',
    icon: Puzzle,
  },
  {
    title: 'Growth Planning',
    description:
      'Unlock new opportunities while scaling efficiently with our Growth Planning approach.',
    slug: 'growth-planning',
    icon: Lightbulb,
  },
  {
    title: 'Performance Optimization',
    description:
      'Streamline processes and increase impact with Performance Optimization.',
    slug: 'performance-optimization',
    icon: Rocket,
  },
]

export default function ServicesGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow + Heading */}
        <div className="mb-12">
          <p className="text-sm text-primary font-medium mb-2 tracking-wide">
            [Core Services]
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
            Explore More <span className="italic text-primary">Services</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <ServiceCard key={idx} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
