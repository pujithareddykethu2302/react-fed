import { useState } from "react";
import DisplayCard from "./DisplayCard";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ReactDays = () => {
  const [searchData, setSearchData] = useState("");
  const [headerUpdate, setHeaderUpdate] = useState(false);

  return (
    <div className="mt-5 min-h-screen p-4 flex flex-col gap-4">
      <div className="flex items-center mt-1">
        <a href="/" className="mr-[0.1rem] flex font-[600]">
          Home
        </a>
        <NavigateNextIcon fontSize="small" />
        <p className="mr-[1rem]">Challenge Hub</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 sm:flex-none border border-gray-300 h-10 rounded-[15px] flex-row items-center px-3 py-2 w-full lg:w-[40%]">
          <SearchIcon className="mr-2" />
          <input
            type="text"
            placeholder="Type here to search"
            className="flex-1 focus:outline-none"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          {searchData && (
            <button onClick={() => setSearchData("")} className="ml-2">
              <CloseIcon fontSize="small" />
            </button>
          )}
        </div>
      </div>

      {/* Cards */}
      <DisplayCard searchData={searchData} headerUpdate={headerUpdate} />
    </div>
  );
};

export default ReactDays;
