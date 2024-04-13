'use client'

import { cn } from '@/lib/utils'
import { Variants, motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Props = {}


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


export const Features = (props: Props) => {

    const FEATURES = data.features.length

    const height = `h-[${100 * FEATURES}vh]`
    const ref = useRef<HTMLDivElement | null>(null)



    const [activeNum, setActiveNum] = useState<number>(0)

    const keys = data.features
    process
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]

    })



    useMotionValueEvent(scrollYProgress, "change", (val) => {

        const eachSlide = 1 / FEATURES
        const activeIndex = Math.ceil(val / eachSlide) - 1
        console.log(activeIndex)

        if (activeIndex != activeNum && activeIndex != -1) {
            setActiveNum(activeIndex)
        }
    })

    return (
        <motion.div ref={ref} className={`h-[400vh] mt-20  mb-60`} >


            <div className='sticky flex flex-col gap-10 top-[90px] w-4/5 mx-auto h-[450px]  '>

                <div className='text-4xl flex justify-center w-full'>
                    <h2 className='text-[#201A58]' >Features</h2>
                </div>

                <div className=' flex  w-full h-full   '>
                    <div className='flex flex-col items-center h-full'>
                        <span className='font-mono' >01</span>
                        <motion.div className='relative w-1 h-full  bg-gradient-to-b from-teal-300 to-teal-600   rounded-b-full' style={{ scaleY: scrollYProgress, transformOrigin: "top" }} >
                        </motion.div>
                        <span className='font-mono' >04</span>
                    </div>

                    <div className='flex flex-col my-10 mx-8 text-muted-foreground justify-between'>
                        {
                            keys.map((key, index) => (
                                <div className={cn(index === activeNum && '', 'flex relative flex-col gap-1 p-3 rounded-md')} key={`${key.title}-${index}`}  >
                                    <motion.div className={cn('text-xl', index === activeNum && "text-black font-medium")} >
                                        {key.title}
                                    </motion.div>

                                    {
                                        index === activeNum
                                        &&
                                        <motion.div
                                            transition={{ duration: 1.3 }}
                                            layoutId='hover-blob' className='absolute inset-0 -z-10 bg-[#FEF4EB]' ></motion.div>
                                    }


                                    {
                                        (index === activeNum) &&
                                        <AnimatePresence>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}

                                                transition={{ duration: 1.5 }}
                                                key={`${key.title}-${index}`}
                                                className='text-sm origin-left' >
                                                {key.description}
                                            </motion.div>
                                        </AnimatePresence>
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div className='flex flex-col justify-center ml-auto pr-2 md:pr-10 lg:pr-16' >
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeNum}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -30, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className='relative  size-[250px] md:w-[250px] md:h-[200px]   lg:w-[450px] lg:h-[350px] overflow-hidden rounded-md '>
                                <Image
                                    className='absolute inset-0 object-cover'
                                    unoptimized
                                    src={data.features[activeNum].image} fill sizes='100' alt='image-showing-information' />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>


            </div>
        </motion.div>
    )
}
