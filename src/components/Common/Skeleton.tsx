import React from 'react'
import Skeleton from "@mui/material/Skeleton";


interface Items {
   index: any
}
const CardSkeleton = ({index} : Items) => {
    return (
        
        <div key={index} className="m-[5px] p-[15px] shadow rounded-[10px] min-h-[350px] flex flex-col justify-between bg-gray-50">
            <div className="w-full flex justify-between mb-[10px]">
                <Skeleton className="w-[40px]" />
                <Skeleton className="w-[30px]" />
            </div>
            <div className='mb-[10px]'>
                <Skeleton className='text-[20px] font-[700] leading-[24px] mb-[5px]' />
                <Skeleton className='text-[12px] font-[400] text-gray-500' />
            </div>
            <Skeleton className='w-[6rem] h-[1.5rem] bg-[#FFF2F3] flex items-center justify-center rounded-[8px] mb-[10px]' />

            <Skeleton className='text-[14px] font-[400] leading-[24px] mb-[10px]' />
            <div className='flex w-full mb-[10px]'>
                <div className='flex items-center w-[20%]'>
                    <Skeleton className='rounded-[10px] w-[10px] h-[10px]' />
                    <Skeleton className='text-[14px] font-[400] leading-[24px] w-[30%] ml-[10px]' />
                </div>

                <div className='flex justify-center items-center ml-[20px]'>
                    <Skeleton className='text-[14px] font-[400] leading-[24px]' />
                </div>
            </div>

            <div className='w-full flex justify-end mt-[20px]'>
                <Skeleton className='rounded-[4px] text-white w-[10rem] h-[2.5rem] ' />
            </div>
        </div>
    )
}

export default CardSkeleton;
