import React from 'react'
import SectionHeading from '../common/SectionHeading'
import Image from 'next/image'
import Button from '../common/Button'
import { CheckIcon } from 'lucide-react'

const MissionVisionSection = ({ isVision, isLeft }: { isVision?: boolean, isLeft?: boolean }) => {
    return (
        <div className={`flex  ${isLeft ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'} items-center justify-center gap-16 lg:gap-8 mx-auto max-w-7xl w-full px-4 py-8 md:py-16`}>
            <div className='flex-1'>
                <SectionHeading title={isVision ? "Our Vision" : "Our Mission"} eyeBrow={isVision ? "Vision" : "Mission"} buttonData={{ isShowButton: false, buttonText: "", buttonLink: "", isPrimary: true }} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptas tempora porro, libero facere expedita alias dolorem odit soluta sapiente quasi aut harum, eligendi deserunt perferendis necessitatibus natus suscipit unde.</p>
                <ul className="mt-4 space-y-3">
                    {[
                        "Innovate continuously to stay ahead in a changing market",
                        "Innovate continuously to stay ahead in a changing market",
                        "Innovate continuously to stay ahead in a changing market",
                        "Innovate continuously to stay ahead in a changing market",
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-lg text-foreground/80">
                            <span className="text-primary mt-1"><CheckIcon className='w-5 h-5' /></span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <Button href="/" icon="arrow-up-right" children={isVision ? "Learn More About Our Vision" : "Learn More About Our Mission"} className='mt-6 inline-flex' />
            </div>
            <div className='flex-1'>
                <Image src={isVision ? "/images/vision-img.avif" : "/images/mission-img.avif"} alt={isVision ? "Vision Image" : "Mission Image"} width={500} height={500} className="max-w-full h-auto rounded-lg shadow-lg mt-6 md:mt-0 md:ml-6 lg:ml-12" />
            </div>
        </div>
    )
}

export default MissionVisionSection
 