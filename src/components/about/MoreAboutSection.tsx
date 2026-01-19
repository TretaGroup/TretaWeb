import React from 'react'
import SectionHeading from '@/components/common/SectionHeading'
import { ChartLineIcon, LightbulbIcon, Puzzle } from 'lucide-react'
import Image from 'next/image'
import { div } from 'framer-motion/client'

const MoreAboutSection = () => {
  return (
    <div className='bg-secondary'>
        <div className='flex flex-col items-center justify-center mx-auto max-w-7xl w-full px-4 py-16 md:py-24 '>
            <SectionHeading title={'We Believe In Results With Smart Consulting.'} eyeBrow={'More About Us'} buttonData={{isShowButton:true,buttonLink:"/",buttonText:"See All Service",isPrimary:true}} />
            <div className='mt-10 max-w-full text-lg text-foreground/80 flex  justify-between flex-col lg:flex-row gap-6'>
                <div className="flex-7/12 flex items-center justify-between flex-col">
                    <div>
                        <h3 className='text-xl font-bold'>At Optimo, we believe that real business growth is rooted in strategy, insight, and execution. As a results-driven consulting firm for you.</h3>
                        <p className='text-xl font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas odit vero quod mollitia neque praesentium maiores. Velit quae odit officiis, dolor illo aspernatur quasi quas magni voluptates et ut.</p>
                        <p className='mt-3 text-xl font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas odit vero quod mollitia neque praesentium maiores. Velit quae odit officiis, dolor illo aspernatur quasi quas magni voluptates et ut.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 items-strech justify-start">
                        <div className='flex items-start justify-center flex-col bg-background p-4'>
                            <Puzzle className='w-15 h-15 mb-2 p-3 rounded-full bg-primary/20 text-primary text-2xl' />
                            <h4 className='text-lg font-bold text-primary'>Strategic Planning</h4>
                            <p className='text-sm font-medium'>Define clear goals and chart the path.</p>
                        </div>
                        <div className='flex items-start justify-center flex-col bg-background p-4'>
                            <ChartLineIcon className='w-15 h-15 mb-2 p-3 rounded-full bg-primary/20 text-primary text-2xl' />
                            <h4 className='text-lg font-bold text-primary'>Operational Growth</h4>
                            <p className='text-sm font-medium'>Client Satisfaction</p>
                        </div>
                        <div className='flex items-start justify-center flex-col bg-background p-4'>
                            <LightbulbIcon className='w-15 h-15 mb-2 p-3 rounded-full bg-primary/20 text-primary text-2xl' />
                            <h4 className='text-lg font-bold text-primary'>Digital Evolution</h4>
                            <p className='text-sm font-medium'>Leverage technology to transform.</p>
                        </div>
                    </div>
                    </div>
                <div className="flex-5/12 flex items-center justify-center w-full h-full">
                    <Image src={'/images/hero-img.png'} width={500} height={500} alt='About More Image' className='w-full h-full max-w-md md:max-w-full rounded-2xl'/>
                </div>   
            </div>
        </div>
    </div>
  )
}

export default MoreAboutSection
