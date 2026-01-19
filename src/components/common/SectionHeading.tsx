import { typesButton } from '@/types/otherTypes'
import React from 'react'
import Button from './Button'

const SectionHeading = ({title, eyeBrow, buttonData}: {title: String, eyeBrow: String, buttonData: typesButton}) => {
  return (
    <div className="flex flex-col lg:flex-row md:items-center md:justify-between w-full">
      <div className={`flex flex-col gap-2 max-w-full ${buttonData.isShowButton ? 'mb-5 md:mb-0 lg:max-w-[70%]' : ''}`}>
        <p className="text-primary text-xl font-semibold mb-2 w-fit">[{eyeBrow}]</p>
        <h2 className={` ${buttonData.isShowButton ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} font-semibold text-foreground leading-tight`}>{title}</h2>
      </div>
      {buttonData.isShowButton && <Button href={buttonData.buttonLink} icon="arrow-up-right" children={buttonData.buttonText || 'See All Service'}  className='inline-flex justify-center mt-5 md:mt-0'/>}
    </div>
  )
}

export default SectionHeading
