'use client';
import React, { useState } from 'react'

const PageHeroSection = () => {
    const [bgImage, setBgImage] = useState('url(/images/hero-img.png)');
    return (
      <div
        className="min-h-125 md:min-h-150 w-full bg-cover bg-center bg-no-repeat flex items-center md:items-end justify-center"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.4)),'+bgImage }}
      >
        <div className="text-start max-w-7xl w-full p-4 pb-10 md:pb-16 lg:pb-24">
            <p className='text-xl md:text-2xl text-white mb-3'>[About]</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-200 text-white mb-4 text-wrap">Welcome to Our Website</h1>
        </div>
      </div>
    );
}

export default PageHeroSection
