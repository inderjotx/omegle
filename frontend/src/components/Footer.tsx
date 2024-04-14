import React from 'react'


const footerData = [
    {
        "Platforms": [
            "LiveChat",
            "Zobot",
            "Intercom",
            "Customer"
        ],
        "About": [
            "Our Blog",
            "Customers",
            "Our Team",
            "Careers",
            "Integrations",
            "Partners",
            "Press"
        ],
        "Support": [
            "Test Zoom",
            "Account",
            "Support Center",
            "Live Training",
            "Accessibility",
            "Developer Support"
        ],
        "Sales": [
            "Contact Sales",
            "Pricing & Pricing",
            "Request a Demo",
            "Webinars and Events"
        ]
    }
]


export const Footer = () => {

    const keys = Object.keys(footerData[0])

    return (
        <div className='h-[50vh] md:h-[80vh] relative   flex-col flex  w-full bg-[#201A58]' style={{ alignContent: "space-around" }}  >

            <div className='mt-10 grid grid-cols-4' >
                {

                    keys.map((key) => (
                        <div className='flex flex-col items-center  text-gray-400' key={key} >


                            <div className='space-y-[0.5px]' >
                                <div className='text-white  mb-3 text-sm md:text-base' >{key}</div>

                                {
                                    //@ts-ignore
                                    footerData[0][`${key}`].map((element) => (
                                        <div key={element} className='text-xs md:text-sm ' >{element}</div>
                                    ))
                                }

                            </div>
                        </div>
                    ))

                }
            </div>

            <h2 className='text-[95px] mt-auto leading-none lg:text-[250px] md:text-[200px]  mx-auto text-transparent  bg-gradient-to-b bg-clip-text from-white to-blue-950 ' >Jabber</h2>
            <div className='h-[5%] lg:h-[10%]' ></div>

        </div>
    )
}