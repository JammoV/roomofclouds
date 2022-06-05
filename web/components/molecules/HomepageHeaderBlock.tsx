import Image from 'next/image'
import type { FC } from 'react'

const HomepageHeaderBlock: FC = () => (
    <div className="md:flex my-8 md:flex-row">
        <div className="hidden md:block md:flex-1">
            <Image
                src="/images/home_header.jpg"
                width={424}
                height={476}
                layout="responsive"
            />
        </div>

        <div className="flex md:flex-1 flex-col justify-center align-middle">
            <div className="text-center md:text-left">
                <Image
                    src="/images/logo.png"
                    width={225}
                    height={169}
                    alt="Room of Clouds"
                />
            </div>
            <div className="mx-auto">
                <p className="text-md text-grey text-center max-w-[400px] md:text-left">
                    Welkom op Room of Clouds! Ik ben Eline en de
                    verhalenschrijfster achter deze website. Je vindt hier alles
                    wat met reizen te maken heeft: van stedentrips tot verre
                    reizen.
                </p>
            </div>
        </div>
    </div>
)

export default HomepageHeaderBlock
