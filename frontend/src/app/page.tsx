import { FeaturesLarge } from '@/components/FeatureLarge'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { SmallFeatures } from '@/components/SmallFeatures'
import { Testimonials } from '@/components/Testimonials'
import React from 'react'


const page = () => {
    return (
        <div className='min-h-screen' >
            <Hero />

            {/* only for large screens */}
            <FeaturesLarge />

            {/* small and medium screens */}
            <SmallFeatures />

            <Testimonials />

            <Footer />

        </div>
    )
}



export default page 