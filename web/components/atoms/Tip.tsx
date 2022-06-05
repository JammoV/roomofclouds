import Image from 'next/image'
import type { FC } from 'react'

enum Type {
    GENERAL = 'general',
    FOOD = 'food',
    DRINKS = 'drinks',
    ACTIVITY = 'activity',
    ACCOMMODATION = 'accommodation',
}

export interface TipProps {
    type: Type
    text: string
}

const Tip: FC<TipProps> = ({ text, type }) => {
    return (
        <div className="flex ml-2 mb-2 items-center">
            <div className={`min-w-[50px]`}>
                <Image
                    src={`/images/icons/tip_${type}.png`}
                    width={50}
                    height={50}
                />
            </div>
            <div className={`text-lg ml-4 h-[40px]`}>{text}</div>
        </div>
    )
}

export default Tip
