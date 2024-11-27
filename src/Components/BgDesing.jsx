import React from 'react'
import titleCar from '../assets/images/titleCar.png';

const BgDesing = ({ children }) => {
    return (
        <div className="h-screen max-h-[1200px] flex items-center justify-evenly relative bg-[#FAB76E] text-black w-[100vw] overflow-hidden max-w-[1500px]">
            <img src={titleCar} alt="titleCar" className='absolute z-50 left-[8%] w-[50%]' />
            <div className='w-[50%] h-screen max-h-[1200px] bg-[#080808]'
                style={{
                    clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
                }}>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-[#D27007] text-[37px] font-[cursive] text-center font-bold mt-[15px] '>BOOST</h1>
                    <p className='text-white  text-center leading-5'>__ It doesn't Run fast; it Fly slowly __</p>
                </div>

            </div>
            <div className='w-[50%] flex flex-col items-end justify-center  pr-[5%]'>
                <div className='relative w-[350px] '>
                    <div className='w-[100px] h-[100px] bg-[#000000] rounded-full absolute top-[-30px] right-[-30px] '></div>
                    <div className='w-[100px] h-[100px] bg-[#611723] rounded-full absolute bottom-[-30px] left-[-30px] '></div>

                    {children}
                </div>

            </div>

        </div>
    )
}

export default BgDesing