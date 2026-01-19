'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Instagram } from 'lucide-react'
import { useRouter } from 'next/navigation'

type TeamMember = {
  name: string
  role: string
  slug: string
  img: string
  socials?: {
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}


interface Props {
  members?: TeamMember[]
}

const defaultMembers: TeamMember[] = [
  {
    name: 'David Chen',
    role: 'Consultant',
    slug: 'david-chen',
    img: '/images/team-1.jpg',
    socials: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'Sarah Adams',
    role: 'Strategist',
    slug: 'sarah-adams',
    img: '/images/team-2.jpg',
    socials: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'Lucas Reed',
    role: 'Growth Lead',
    slug: 'lucas-reed',
    img: '/images/team-3.jpg',
    socials: { linkedin: '#', twitter: '#', instagram: '#' },
  },
]


export default function TeamSection({ members = defaultMembers }: Props) {
   const router = useRouter()
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleMove = (e: React.MouseEvent, idx: number) => {
    const card = cardRefs.current[idx]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 15
    const y = (e.clientY - rect.top - rect.height / 2) / 15
    card.style.transform = `rotateX(${y}deg) rotateY(${-x}deg) scale(1.04)`
  }

  const handleLeave = (idx: number) => {
    const card = cardRefs.current[idx]
    if (!card) return
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`
  }

  return (
    <section className="py-20 px-4 bg-surface text-foreground transition-colors">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary mb-1">[Team Members]</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Meet the <span className="italic text-primary">Team</span>
          </h2>
          <p className="mt-4 text-muted">
            Experts powering strategy and execution.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              ref={el => {
                cardRefs.current[idx] = el
              }}
              onMouseMove={e => handleMove(e, idx)}
              onMouseLeave={() => handleLeave(idx)}
              onClick={() => router.push(`/team/${member.slug}`)}
              className="relative rounded-xl overflow-hidden shadow-card bg-card cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative w-full h-100 overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* FLOATING ISLAND DETAILS */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] rounded-xl bg-black/30 p-4 backdrop-blur-md flex items-center justify-between shadow-lg border border-white/10 text-white">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm opacity-90">{member.role}</p>
                </div>

                <div className="flex items-center gap-2">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin}><Linkedin size={18} /></a>
                  )}
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter}><Twitter size={18} /></a>
                  )}
                  {member.socials?.instagram && (
                    <a href={member.socials.instagram}><Instagram size={18} /></a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
