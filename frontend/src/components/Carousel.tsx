import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import { TestCard } from './TestCard'
import { CommentType } from './Testimonials'

type PropType = {
    slides: CommentType
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            //@ts-ignore
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        //@ts-ignore
        resetOrStop()
    }, [])


    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick
    )


    return (
        <section className="embla flex flex-col  gap-4 ">
            <div className="embla__viewport " ref={emblaRef}>
                <div className="embla__container ">
                    {slides.map((val, index) => (
                        <div className="embla__slide  flex justify-center" key={index}>
                            <TestCard color='' comment={val} className={val.className} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex ">
                <div className="mx-auto space-x-3">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            active={index === selectedIndex}
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
