'use client'
import React, { FC } from 'react'
import { motion } from 'framer-motion'


type Props = {
    color: string,
    varNum: "first" | "second"
}

const variants = {
    'first': {
        x: ['-20%', '210%', '-30%'],
        y: ['-40%', '30%', '120%']
    },
    'second': {
        x: ['40%', '-50%', '300%'],
        y: ['100%', '-10%', '-40%']
    }
}
export const MovingBlob: FC<Props> = ({ color, varNum }) => {


    return (
        <motion.div
            className='absolute top-0 z-10 opacity-30 size-60'
            variants={variants}
            animate={varNum}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", repeatDelay: 5 }}
        >
            <svg className='blur-3xl' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill={color} d="M54,-63.7C69.4,-51.5,80.8,-33.9,85.5,-14C90.3,5.8,88.4,27.9,78.5,45.7C68.6,63.5,50.8,77,30.9,83.7C11.1,90.3,-10.8,90,-29.8,82.7C-48.8,75.4,-65,61.2,-75.8,43.3C-86.6,25.5,-92.1,4.2,-88.4,-15.4C-84.7,-35,-72,-52.8,-55.7,-64.9C-39.5,-77,-19.7,-83.4,-0.2,-83.1C19.3,-82.9,38.6,-76,54,-63.7Z" transform="translate(100 100)" />
            </svg>
        </motion.div>
    )
}