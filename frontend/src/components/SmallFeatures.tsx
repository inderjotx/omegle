'use client'
import React, { useRef } from 'react'
import { FeatCard } from './FeatCard'
import { useScroll, motion, useTransform } from 'framer-motion'



const data = {
    "features": [
        {
            "title": "Beautiful, simple video calls",
            "description": "Meet with anyone on the internet with a simple, elegant video call experience.",
            "image": "/features/one.jpg"
        },
        {
            "title": "Connect with anyone on the internet",
            "description": "Connect with anyone, anywhere in the world with just a few clicks.",
            "image": "/features/two.jpg"
        },
        {
            "title": "Engagement with gesture recognition",
            "description": "Engage with your audience using gesture recognition to control your presence on the call.",
            "image": "/features/four.jpg"
        },
        {
            "title": "Chat features give you more control over your presence",
            "description": "Chat features allow you to have more control over your presence during the call.",
            "image": "/features/three.png"
        }
    ]
}


export const SmallFeatures = () => {

    const ref = useRef<null | HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref
    })


    const xOffset = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"])

    return (
        <motion.div ref={ref} className='h-[300vh] mt-20  block lg:hidden  ' >

            <div className='sticky pt-8  top-[100px] h-[70vh] flex  overflow-hidden bg-[#E0FFF9]' >



                <motion.div style={{ x: xOffset }} className='flex gap-12'>
                    {
                        data.features.map((feat) => (
                            <FeatCard key={feat.title} feature={feat} />
                        ))
                    }
                </motion.div>

            </div>
        </motion.div>
    )
}