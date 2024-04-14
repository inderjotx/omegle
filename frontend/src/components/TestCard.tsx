import { cn } from '@/lib/utils'
import React, { FC } from 'react'
import Image from 'next/image'

type Props = {
    color: string,
    comment: {
        name: string,
        title: string,
        content: string,
        designation: string,
        image: string
    }
    ,
    className: string
}

export const TestCard: FC<Props> = ({ color, comment, className }) => {
    return (
        <div className={cn('w-[300px] my-auto flex gap-4 border p-8  rounded-md flex-col', className)}>

            <div className='text-sm'>{comment.title}</div>
            <div className='text-xs font-light' >{comment.content}</div>

            <div className='flex gap-3'>
                <div className='size-9 relative rounded-full overflow-hidden  border'  >
                    <Image src={comment.image} alt={comment.name} className='object-cover grayscale' fill sizes='100' />
                </div>
                <div className='flex flex-col gap-[0.5px]' >
                    <div className='text-sm' >{comment.name}</div>
                    <div className='text-xs' >{comment.designation}</div>
                </div>
            </div>

        </div>
    )
}