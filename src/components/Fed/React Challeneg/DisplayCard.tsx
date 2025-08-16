import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import CardSkeleton from "../../Common/Skeleton";
import NoData from "../../../assets/Images/ChallengesPage/Empty-cuate.svg"

interface Data {
    CardsData: any;
    searchData: string;
    loading: boolean;
}
const DisplayCard = ({ CardsData, searchData, loading }: Data) => {
    const SearchFilterData = CardsData.filter((items: any) => {

        return (items.title.toLowerCase().includes(searchData.toLowerCase()) ||
            items.topic.toLowerCase().includes(searchData.toLowerCase()) ||
            items.difficulty.toLowerCase().includes(searchData.toLowerCase()) ||
            items.dayChallenge.toLowerCase().includes(searchData.toLowerCase()))
    }
    )
    const DisplayData = searchData.trim() ? SearchFilterData : CardsData
    return (
        <>
            {loading ? (
                <div className={`flex-1 grid grid-cols-3  justify-center items-center rounded-[8px] py-4  'lg:grid-cols-3'`} >
                    {Array.from({ length: DisplayData.length || 6 }).map((_, index) => (
                        <CardSkeleton index={index} />

                    ))}
                </div>

            ) : DisplayData.length > 0 ? (
                <div className={`flex-1 grid grid-cols-3  justify-center items-center rounded-[8px] py-4  'lg:grid-cols-3'`} >
                    {
                        DisplayData.map((items: any) => {
                            const DifficultyStatusColor = (status: string) => {
                                if (status === 'Easy') {
                                    return '#1E7F55'
                                }
                                else if (status === 'Medium') {
                                    return '#B86E00'
                                }

                                return '#B00020'

                            }

                            return (
                                <div className='bg-white m-[5px] p-[15px] shadow rounded-[10px] min-h-[350px] flex flex-col justify-between'>
                                    <div className='w-full flex justify-between mb-[10px]'>
                                        <p className='text-[12px] font-[400] leading-[24px]'>{items.dayChallenge}</p>
                                        <img src={items.icon} className='w-5 h-5' />
                                    </div>
                                    <div className='mb-[10px]'>
                                        <p className='text-[20px] font-[700] leading-[24px] mb-[5px]'>{items.title}</p>
                                        <p className='text-[12px] font-[400] text-gray-500'>{items.topic}</p>
                                    </div>
                                    <div className='w-[6rem] h-[1.5rem] bg-[#FFF2F3] flex items-center justify-center rounded-[8px] border border-[#DF001A] mb-[10px]'>
                                        <p className='text-gray-500 text-[10px]'>{items.status}</p>
                                    </div>
                                    <p className='text-[14px] font-[400] leading-[24px] mb-[10px]'>{items.longDescription}</p>
                                    <div className='flex w-full mb-[10px]'>
                                        <div className='flex items-center w-[20%]'>
                                            <div className='rounded-[10px] border w-[10px] h-[10px]' style={{ backgroundColor: DifficultyStatusColor(items.difficulty), borderColor: DifficultyStatusColor(items.difficulty) }}></div>
                                            <p className='text-[14px] font-[400] leading-[24px] w-[30%] ml-[10px]' style={{ color: DifficultyStatusColor(items.difficulty) }}> {items.difficulty}</p>
                                        </div>

                                        <div className='flex justify-center items-center ml-[20px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-[5px]">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <p className='text-[14px] font-[400] leading-[24px]'> {items.timeEstimate}</p>

                                        </div>
                                    </div>

                                    <div className='w-full flex justify-end mt-[20px]'>
                                        <button className='bg-[#563A9C] rounded-[4px] text-white w-[10rem] h-[2.5rem] cursor-pointer'>
                                            <Link to="/day1"> Start Now</Link>
                                        </button>
                                    </div>
                                </div>


                            )
                        })
                    }
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-screen">
                    <img src={NoData} className="w-[30rem] h-[30rem]" alt="No data" />
                    <p className="mt-4 text-[#563A9C] text-lg font-semibold">
                        No challenges found
                    </p>
                </div>
            )}

        </>
    )
}

export default DisplayCard
