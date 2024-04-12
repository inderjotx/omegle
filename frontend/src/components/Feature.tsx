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
            "image": "/features/one.jpg"
        },
        {
            "title": "Engagement with gesture recognition",
            "description": "Engage with your audience using gesture recognition to control your presence on the call.",
            "image": "/features/one.jpg"
        },
        {
            "title": "Chat features give you more control over your presence",
            "description": "Chat features allow you to have more control over your presence during the call.",
            "image": "/features/one.jpg"
        }
    ]
}


const variants = {
    "enter": {
        opacity: [0, 1],
        y: [30, 0],
        z: [2, 0],
        transition: { duration: 0.5 }
    },
    "exit": {
        opacity: [1, 0],
        y: [0, 30],
        z: [0, 2],
        transition: { duration: 0.5 }
    }

} satisfies Variants

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
        <motion.div ref={ref} className={`${height}`} >

            <div className='sticky flex top-[130px] w-4/5 mx-auto h-[450px]  '>
                <div className='flex flex-col h-full'>
                    <motion.div className='relative w-1 h-full bg-[#25AEB8] rounded-b-full' style={{ scaleY: scrollYProgress, transformOrigin: "top" }} >
                    </motion.div>
                </div>

                <div className='flex flex-col my-10 mx-8 text-muted-foreground justify-between'>
                    {
                        keys.map((key, index) => (
                            <div className={'flex flex-col gap-1'} key={key.title}>
                                <div className={cn('text-2xl', index === activeNum && "text-orange-500")} >
                                    {key.title}
                                </div>


                                {
                                    (index === activeNum) &&
                                    <motion.div
                                        className='' >
                                        {key.description}
                                    </motion.div>
                                }


                            </div>
                        ))
                    }
                </div>

                <div className='flex flex-col justify-center ml-auto pr-5 md:pr-10 lg:pr-28' >
                    <AnimatePresence>
                        <motion.div
                            key={activeNum}
                            variants={variants}
                            animate={"enter"}
                            exit={"exit"}
                            className='relative  size-[250px] md:w-[250px] md:h-[200px]   lg:w-[450px] lg:h-[300px] overflow-hidden rounded-md '>
                            <Image
                                className='absolute inset-0 object-cover'
                                src={data.features[activeNum].image} fill sizes='100' alt='image-showing-information' />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

        </motion.div>
    )
}
