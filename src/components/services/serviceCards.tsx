'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import Button from '@/components/common/Button'

interface ServiceCardProps {
  title: string
  description: string
  slug: string
  icon: LucideIcon
}

export default function ServiceCard({
  title,
  description,
  slug,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <div className="rounded-xl bg-background shadow-sm border border-secondary p-6 flex flex-col justify-between hover:shadow-md transition">
      {/* Icon */}
      <div className="mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon className="text-primary w-6 h-6" />
        </div>
      </div>

      {/* Text */}
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-foreground/80">{description}</p>
      </div>

      {/* Button */}
      <Button
                href={`/services/${slug}`}
                icon="arrow-up-right"
                className={`hidden lg:inline-flex bg-transparent text-foreground items-center justify-start  hover:text-primary rounded-full py-3 px-0! text-md appearance-none transition-colors`}
                variant='white'
              >
                Get Started
              </Button>
    </div>
  )
}
