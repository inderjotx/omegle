import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import React from 'react'
import { MovingBlob } from './MovingBlob'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

const poppins = Poppins({ weight: ["500"], subsets: ['latin'] })

const config = {
    "hero": {
        mainText: {
            headingTop: "Free Video Meeeting",
            heading: "Beautiful, simple video calls",
            headingBottom: "Jabber is the most enjoyable way to connect over video ,for a world in which eveyone world ",
            button: {
                text: "Try for Free",
            }

        }
    }
}


export const Hero = () => {
    return (
        <div className='w-full' >

            <div className='h-[60vh] relative w-full flex flex-col items-center overflow-hidden justify-center bg-[#201A58]'>
                <MovingBlob varNum='first' color='#F5994E' />
                <MovingBlob varNum='second' color='#25AEB8' />

                <div className='w-11/12 md:w-3/5 lg:2/5 flex flex-col gap-4 text-center items-center text-white'>
                    <h5 className='text-sm '>{config.hero.mainText.headingTop}</h5>
                    <h1 className={cn('text-6xl lg:text-7xl font-bold text-center', poppins.className)} >{config.hero.mainText.heading}</h1>
                    <h6 className='text-sm font-light' >{config.hero.mainText.headingBottom}</h6>

                    <Button asChild className='z-40 bg-orange-400 hover:bg-orange-500' >

                        <Link href={'/room'} >
                            {config.hero.mainText.button.text}
                        </Link>

                    </Button>
                </div>
            </div>

            <div className='h-1/3  w-full relative z-20 '>
                <Image src='/hero/hero.png' unoptimized alt='hero_imaege' height="40" width='80' className="w-4/5 mx-auto rounded-md -translate-y-6 md:-translate-y-10 lg:-translate-y-10 " />
            </div>


        </div>
    )
}