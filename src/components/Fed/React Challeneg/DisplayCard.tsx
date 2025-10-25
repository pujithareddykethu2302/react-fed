import { useNavigate } from "react-router-dom";
import CardSkeleton from "../../Common/Skeleton";
import NoData from "../../../assets/Images/ChallengesPage/Empty-cuate.svg";
import { useState } from "react";
import { useChallenges } from "../../Common/ChallengeContext";


interface Data {
  searchData: string;
  headerUpdate: boolean;
}
const DisplayCard = ({ searchData }: Data) => {
  const { CardsData, loading } = useChallenges();
  const SearchFilterData = CardsData.filter((items: any) => {
    return (
      items.title.toLowerCase().includes(searchData.toLowerCase()) ||
      items.topic.toLowerCase().includes(searchData.toLowerCase()) ||
      items.difficulty.toLowerCase().includes(searchData.toLowerCase()) ||
      items.dayChallenge.toLowerCase().includes(searchData.toLowerCase())
    );
  });
  const DisplayData = searchData.trim() ? SearchFilterData : CardsData;
  const navigate = useNavigate();
  const [CurrentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const TotalPages = Math.ceil(DisplayData.length / pageSize);
  const PageNumbers = Array.from({ length: TotalPages }, (_, i) => i + 1);

  const startIndex = (CurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const AfterPaginationDisplayData = DisplayData.slice(startIndex, endIndex);

const handleStart = (challenge: any) => {
  navigate(
    `/30-days-challenge/challenge-details/${challenge.dayChallenge
      .replace(/\s+/g, "-")
      .toLowerCase()}`,
    { state: { ...challenge } }
  );
};

  return (
    <>
      {loading ? (
        <div
          className={`flex-1 grid grid-cols-3  justify-center items-center rounded-[8px] py-4  'lg:grid-cols-3'`}
        >
          {Array.from({ length: DisplayData.length || 6 }).map((_, index) => (
            <CardSkeleton index={index} />
          ))}
        </div>
      ) : DisplayData.length > 0 ? (
        <div className="">
         <div
  className={`flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4`}
>
  {AfterPaginationDisplayData.map((items: any, i:any) => {
    const DifficultyStatusColor = (status: string) => {
      if (status === "Easy") return "#1E7F55";
      if (status === "Medium") return "#B86E00";
      return "#B00020";
    };

    return (
      <div key={items.id || i}>
     

        <div className="bg-white p-4 shadow rounded-lg min-h-[300px] flex flex-col justify-between">
   
          <div className="flex justify-between mb-2">
            <p className="text-xs font-medium">{items.dayChallenge}</p>
            <img src={items.icon} className="w-5 h-5" />
          </div>

          <div className="mb-2">
            <p className="text-lg font-bold">{items.title}</p>
            <p className="text-sm text-gray-500">{items.topic}</p>
          </div>

          <div
            className={`w-[6rem] h-6 flex items-center justify-center rounded-md mb-2 border`}
            style={{
              backgroundColor:
                items.status === "In Progress"
                  ? "#FFF8E1"
                  : items.status === "Completed"
                  ? "#E8F5E9"
                  : "#FFF2F3",
              borderColor:
                items.status === "In Progress"
                  ? "#FBC02D"
                  : items.status === "Completed"
                  ? "#1E7F55"
                  : "#DF001A",
            }}
          >
            <p
              className="text-xs font-medium"
              style={{
                color:
                  items.status === "In Progress"
                    ? "#FBC02D"
                    : items.status === "Completed"
                    ? "#1E7F55"
                    : "#DF001A",
              }}
            >
              {items.status}
            </p>
          </div>

          <p className="text-sm mb-2">{items.shortDescription}</p>


          <div className="flex items-center gap-4 mb-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div
                className="rounded-full w-3 h-3 border"
                style={{
                  backgroundColor: DifficultyStatusColor(items.difficulty),
                  borderColor: DifficultyStatusColor(items.difficulty),
                }}
              />
              <p
                className="text-sm"
                style={{ color: DifficultyStatusColor(items.difficulty) }}
              >
                {items.difficulty}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="text-sm">{items.timeEstimate}</p>
            </div>
          </div>


          <div className="flex justify-end mt-2">
            <button
              className="px-4 py-2 bg-[#563A9C] text-white rounded hover:bg-[#472F85] "
              onClick={() => handleStart(items)}
            >
              {items.status === "In Progress"
                ? "Continue"
                : items.status === "Completed"
                ? "Completed"
                : "Start Now"}
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>


          <div className="flex justify-center items-center">
            <button
              className="bg-gray-300 w-[2.5rem] h-[2.5rem]  mr-[5px]  border disabled:opacity-30 border-gray-300 cursor-pointer disabled:cursor-default"
              type="button"
              disabled={CurrentPage === 1}
              onClick={() => {
                setCurrentPage((p) => p - 1);
              }}
            >
              ˂
            </button>
            {PageNumbers.map((i) => {
              return (
                <>
                  <button
                    className={` w-[2.5rem] h-[2.5rem] border mr-[5px] cursor-pointer ${
                      CurrentPage == i
                        ? "bg-[#563A9C] text-white border"
                        : "border border-gray-300"
                    }`}
                    type="button"
                    onClick={() => setCurrentPage(i)}
                  >
                    {i}
                  </button>
                </>
              );
            })}
            <button
              className="bg-gray-300 w-[2.5rem] h-[2.5rem] border border-gray-300 cursor-pointer disabled:cursor-default disabled:opacity-10"
              onClick={() => {
                setCurrentPage((p) => p + 1);
              }}
              disabled={CurrentPage === TotalPages}
              type="button"
            >
              ˃
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <img src={NoData} className="w-[30rem] h-[30rem]" alt="No data" />
          <p className="mt-4 text-[#563A9C] text-lg font-semibold">
            Looks like we couldn’t find what you’re looking for.
          </p>
        </div>
      )}
    </>
  );
};

export default DisplayCard;
