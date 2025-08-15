import axios from 'axios'
import { useEffect, useState } from 'react'
import DisplayCard from './DisplayCard'
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';

const ReactDays = () => {
    const [CardsData, setCardsData] = useState<any>([])
    const [searchData, setSearchData] = useState('')
    const [loading, setLoading] = useState(true)

    const SearchFilterData = CardsData.filter((items: any) => {
        return items.title.toLowerCase().includes(searchData.toLowerCase())
    }
    )

    useEffect(() => {
        axios.get("http://localhost:3001/days")
            .then((req) => {
                setTimeout(() => {
                    setCardsData(req.data)
                    setLoading(false)
                }, 5000)
            })
    }, [])
    return (
        <div className='mt-[20px]'>
            <div className="flex border border-gray-300 h-[40px] w-[340px] rounded-[15px] flex-row  items-center px-[15px]">
                <div className="flex mr-[10px]">
                    <SearchIcon />

                </div>
                <input type="text" placeholder="Type here to search" className="focus:outline-none" value={searchData} onChange={(e) => {
                    setSearchData(e.target.value)
                }} />
            </div>
            <div className='mt-[20px] ml-[10px] flex justify-center items-center'>
                <p className='font-[700] text-[32px] text-center w-[51%] text-[#e6ab34]'>Welcome to the 30-Day React Challenge <span> — let’s build something amazing, one day at a time!</span></p>
            </div>
            <div className="">
                {loading ? (
                    <Skeleton />
                ) : (<DisplayCard CardsData={CardsData} searchData={searchData} />)}

            </div>
        </div>
    )
}

export default ReactDays
