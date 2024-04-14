'use client'
import React from 'react'
import { TestCard } from './TestCard'
import EmblaCarousel from './Carousel'

const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export type CommentType = typeof messages

const messages = [
    {
        "name": "Nabil Samad",
        "title": "Chat feature give you more control",
        "designation": "UI/UX Designer",
        "content": "Whereby makes it super simple for collaborating teams to jump on a video call. A single meeting link shared instantly ensures a moment of creativity is never lost. When our company moved to remote working, Whereby was the perfect solution. It's so easy to use and the team loves the design. Ideal for growing businesses!",
        "className": "bg-purple-200 text-black border-black ",
        "image": "/hero/boy.avif"
    },
    {
        "name": "Smriti Mandana",
        "title": "What a wonderful platform!!",
        "designation": "UI/UX Designer",
        "content": "Whereby makes it super simple for collaborating teams to jump on a video call. A single meeting link shared instantly ensures a moment of creativity is never lost.",
        "className": "bg-white border-black  ",
        "image": "/hero/girl.avif"


    },

    {
        "name": "Samantha",
        "title": "What a wonderful platform!!",
        "designation": "UI/UX Designer",
        "content": "Whereby makes it super simple for collaborating teams to jump on a video call. A single meeting link shared instantly ensures a moment of creativity is never lost.",
        "className": "bg-orange-200 text-black border-black ",
        "image": "/hero/girl.avif"


    }
    ,

    {
        "name": "Nabil Samad",
        "title": "Chat feature give you more control",
        "designation": "UI/UX Designer",
        "content": "Whereby makes it super simple for collaborating teams to jump on a video call. A single meeting link shared instantly ensures a moment of creativity is never lost. When our company moved to remote working, Whereby was the perfect solution. It's so easy to use and the team loves the design. Ideal for growing businesses!",
        "className": "bg-white border-black  ",
        "image": "/hero/boy.avif"
    },
    {
        "name": "Smriti Mandana",
        "title": "What a wonderful platform!!",
        "designation": "UI/UX Designer",
        "content": "Whereby makes it super simple for collaborating teams to jump on a video call. A single meeting link shared instantly ensures a moment of creativity is never lost.",
        "className": "bg-purple-200 text-black border-black",
        "image": "/hero/boy.avif"
    },

    {
        "name": "Samantha",
        "title": "What a wonderful platform!!",
        "designation": "UI/UX Designer",
        "content": "Whereby makes it super simple for collaborating teams to jump on a video call. A single meeting link shared instantly ensures a moment of creativity is never lost.",
        "className": "bg-[#E0FFF9] text-black border-black shadow-sm",
        "image": "/hero/girl.avif"
    }


]

export const Testimonials = () => {
    return (
        <div className='h-[80vh] mt-28 mb-20 w-full overflow-hidden flex flex-col  justify-center items-center  '>

            <div className='flex flex-col font-light text-muted-foreground text-center items-center gap-2 w-1/2' >
                <h6 className='text-xs'>Testimonial</h6>
                <h2 className='text-3xl text-black'>Loved by our clients</h2>
                <h4 className='text-xs'>This is some random gibberish text that makes no sense. But I have written something to fill space</h4>
            </div>

            <EmblaCarousel slides={messages} options={{ loop: true }} />

        </div>
    )
}