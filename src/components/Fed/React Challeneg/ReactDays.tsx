import { useState } from "react";
import DisplayCard from "./DisplayCard";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useChallenges } from "../../Common/ChallengeContext";

const ReactDays = () => {
  const { CardsData, setCardsData, loading } = useChallenges();
  const [searchData, setSearchData] = useState("");
  const [headerUpdate, setHeaderUpdate] = useState(false);
  const SearchFilterData = CardsData.filter((items: any) => {
    return items.title.toLowerCase().includes(searchData.toLowerCase());
  });

  return (
    <div className="mt-[20px] h-screen">
      <div className="flex justify-between mx-[5px]">
        <div className="flex border border-gray-300 h-[40px] w-[340px] rounded-[15px] flex-row  items-center px-[15px]">
          <div className="flex mr-[10px]">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Type here to search"
            className="focus:outline-none"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="bg-[#563A9C] rounded-[4px] text-white w-[5rem] h-[2.5rem] cursor-pointer mr-[5px]"
            onClick={() => {
              setHeaderUpdate(true);
            }}
          >
            Reset
          </button>
          <button
            onClick={() => {
              setHeaderUpdate(false);
            }}
            className={`${headerUpdate ? "visible" : "hidden"}`}
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* <div className='mt-[20px] ml-[10px] flex justify-center items-center'>
                <p className='font-[700] text-[32px] text-center w-[51%] text-[#e6ab34]'>Welcome to the 30-Day React Challenge <span> — let’s build something amazing, one day at a time!</span></p>
            </div> */}

      <DisplayCard
        // CardsData={CardsData}
        searchData={searchData}
        // loading={loading}
        headerUpdate={headerUpdate}
       // setCardsData={setCardsData}
      />
    </div>
  );
};

export default ReactDays;
