import { useNavigate } from "react-router-dom";
import CardSkeleton from "../../Common/Skeleton";
import NoData from "../../../assets/Images/ChallengesPage/Empty-cuate.svg";
import { useState } from "react";
import { useChallenges } from "../../Common/ChallengeContext";

interface Data {
  searchData: string;
}

const DisplayCard = ({ searchData }: Data) => {
  const { CardsData, loading } = useChallenges();
  const navigate = useNavigate();
  const [CurrentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const getMergedCardsData = () => {
    const stored = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
    return CardsData.map((c: any) =>
      stored[c.id] ? { ...c, ...stored[c.id] } : c
    );
  };

  const mergedCardsData = getMergedCardsData();

  const SearchFilterData = mergedCardsData.filter((item: any) => {
    return (
      item.title.toLowerCase().includes(searchData.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchData.toLowerCase()) ||
      item.difficulty.toLowerCase().includes(searchData.toLowerCase()) ||
      item.dayChallenge.toLowerCase().includes(searchData.toLowerCase())
    );
  });

  const DisplayData = searchData.trim() ? SearchFilterData : mergedCardsData;

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

  const DifficultyStatusColor = (status: string) => {
    if (status === "Easy") return "#1E7F55";
    if (status === "Medium") return "#B86E00";
    return "#B00020";
  };

  return (
    <>
      {loading ? (
        <div className="flex-1 grid grid-cols-3 justify-center items-center rounded-[8px] py-4">
          {Array.from({ length: DisplayData.length || 6 }).map((_, index) => (
            <CardSkeleton key={index} index={index} />
          ))}
        </div>
      ) : DisplayData.length > 0 ? (
        <div className="">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {AfterPaginationDisplayData.map((item: any) => (
              <div key={item.id}>
                <div className="bg-[#fcfaff]  p-4 shadow rounded-lg min-h-[300px] flex flex-col justify-between">
                  <div className="flex justify-between mb-2">
                    <p className="text-xs font-medium">{item.dayChallenge}</p>
                    <img src={item.icon} className="w-5 h-5" />
                  </div>

                  <div className="mb-2">
                    <p className="text-lg font-bold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.topic}</p>
                  </div>

                  <div
                    className={`w-[6rem] h-6 flex items-center justify-center rounded-md mb-2 border`}
                    style={{
                      backgroundColor:
                        item.status === "In Progress"
                          ? "#FFF8E1"
                          : item.status === "Completed"
                          ? "#E8F5E9"
                          : "#FFF2F3",
                      borderColor:
                        item.status === "In Progress"
                          ? "#FBC02D"
                          : item.status === "Completed"
                          ? "#1E7F55"
                          : "#DF001A",
                    }}
                  >
                    <p
                      className="text-xs font-medium"
                      style={{
                        color:
                          item.status === "In Progress"
                            ? "#FBC02D"
                            : item.status === "Completed"
                            ? "#1E7F55"
                            : "#DF001A",
                      }}
                    >
                      {item.status}
                    </p>
                  </div>

                  <p className="text-sm mb-2">{item.shortDescription}</p>

                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div
                        className="rounded-full w-3 h-3 border"
                        style={{
                          backgroundColor: DifficultyStatusColor(
                            item.difficulty
                          ),
                          borderColor: DifficultyStatusColor(item.difficulty),
                        }}
                      />
                      <p
                        className="text-sm"
                        style={{
                          color: DifficultyStatusColor(item.difficulty),
                        }}
                      >
                        {item.difficulty}
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
                      <p className="text-sm">{item.timeEstimate}</p>
                    </div>
                  </div>

                  <button
                    className={`px-4 py-2 text-white rounded transition-all
    ${
      item.status === "Completed"
        ? "bg-[#6BBA62] hover:bg-[#5aa552]"
        : item.status === "In Progress"
        ? "bg-[#f0b429] hover:bg-[#d99a00]"
        : "bg-[#563A9C] hover:bg-[#472e85]"
    }`}
                    onClick={() => handleStart(item)}
                  >
                    {item.status === "In Progress"
                      ? "Continue"
                      : item.status === "Completed"
                      ? "View code"
                      : "Start Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-gray-300 w-[2.5rem] h-[2.5rem] mr-[5px] border disabled:opacity-30 disabled:cursor-default"
              type="button"
              disabled={CurrentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ˂
            </button>

            {PageNumbers.map((i) => (
              <button
                key={i}
                className={`w-[2.5rem] h-[2.5rem] border mr-[5px] cursor-pointer ${
                  CurrentPage === i
                    ? "bg-[#563A9C] text-white border"
                    : "border border-gray-300"
                }`}
                type="button"
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </button>
            ))}

            <button
              className="bg-gray-300 w-[2.5rem] h-[2.5rem] border disabled:opacity-10 disabled:cursor-default"
              onClick={() => setCurrentPage((p) => p + 1)}
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
