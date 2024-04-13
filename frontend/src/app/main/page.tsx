import { Features } from '@/components/Feature'
import { Hero } from '@/components/Hero'
import { Testimonials } from '@/components/Testimonials'
import React from 'react'


const page = () => {
    return (
        <div className='min-h-screen' >
            <Hero />

            <Features />

            <Testimonials />

        </div>
    )
}



export default page 