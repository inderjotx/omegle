
import Image from 'next/image'
import React from 'react'

type Props = {
    feature: {
        title: string,
        description: string,
        image: string
    }
}

export const FeatCard: React.FC<Props> = ({ feature }) => {
    return (

        <div className='flex flex-col gap-4 py-4   h-[450px] w-[400px]' >

            <div className='h-[350px]  rounded-md overflow-hidden relative w-full' >
                <Image src={feature.image} alt={feature.title} unoptimized fill className='object-cover absolute  ' sizes='10' />
            </div>
            <h2 className='h-[50px] text-center text-xl ' >{feature.title}</h2>


        </div>
    )
}