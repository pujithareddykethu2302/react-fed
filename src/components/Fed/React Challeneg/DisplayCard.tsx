import { Link } from "react-router-dom";
import CardSkeleton from "../../Common/Skeleton";
import NoData from "../../../assets/Images/ChallengesPage/Empty-cuate.svg";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Data {
  CardsData: any;
  searchData: string;
  loading: boolean;
  headerUpdate: boolean;
}
const DisplayCard = ({
  CardsData,
  searchData,
  loading,
  headerUpdate,
}: Data) => {
  const SearchFilterData = CardsData.filter((items: any) => {
    return (
      items.title.toLowerCase().includes(searchData.toLowerCase()) ||
      items.topic.toLowerCase().includes(searchData.toLowerCase()) ||
      items.difficulty.toLowerCase().includes(searchData.toLowerCase()) ||
      items.dayChallenge.toLowerCase().includes(searchData.toLowerCase())
    );
  });
  const DisplayData = searchData.trim() ? SearchFilterData : CardsData;

  const [CurrentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const TotalPages = Math.ceil(DisplayData.length / pageSize);
  const PageNumbers = Array.from({ length: TotalPages }, (_, i) => i + 1);

  const startIndex = (CurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const AfterPaginationDisplayData = DisplayData.slice(startIndex, endIndex);

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
            className={`flex-1 grid grid-cols-3  justify-center items-center rounded-[8px] py-4  'lg:grid-cols-3'`}
          >
            {AfterPaginationDisplayData.map((items: any) => {
              const DifficultyStatusColor = (status: string) => {
                if (status === "Easy") {
                  return "#1E7F55";
                } else if (status === "Medium") {
                  return "#B86E00";
                }

                return "#B00020";
              };

              return (
                <div>
                  {headerUpdate && (
                    <div className="flex justify-end my-[1rem]">
                      <button className="border rounded-[4px] mr-[10px] border-[#563A9C] cursor-pointer ">
                        <EditIcon sx={{ color: "#563A9C" }} />{" "}
                      </button>
                      <button className="border border-red-500 rounded-[4px] mr-[10px] cursor-pointer">
                        <DeleteOutlineIcon sx={{ color: "#DF001A" }} />{" "}
                      </button>
                    </div>
                  )}
                  <div className="bg-white m-[5px] p-[15px] shadow rounded-[10px] min-h-[350px] flex flex-col justify-between">
                    <div className="w-full flex justify-between mb-[10px]">
                      <p className="text-[12px] font-[400] leading-[24px]">
                        {items.dayChallenge}
                      </p>
                      <img src={items.icon} className="w-5 h-5" />
                    </div>
                    <div className="mb-[10px]">
                      <p className="text-[20px] font-[700] leading-[24px] mb-[5px]">
                        {items.title}
                      </p>
                      <p className="text-[12px] font-[400] text-gray-500">
                        {items.topic}
                      </p>
                    </div>
                    <div className="w-[6rem] h-[1.5rem] bg-[#FFF2F3] flex items-center justify-center rounded-[8px] border border-[#DF001A] mb-[10px]">
                      <p className="text-gray-500 text-[10px]">
                        {items.status}
                      </p>
                    </div>
                    <p className="text-[14px] font-[400] leading-[24px] mb-[10px]">
                      {items.longDescription}
                    </p>
                    <div className="flex w-full mb-[10px]">
                      <div className="flex items-center w-[20%]">
                        <div
                          className="rounded-[10px] border w-[10px] h-[10px]"
                          style={{
                            backgroundColor: DifficultyStatusColor(
                              items.difficulty
                            ),
                            borderColor: DifficultyStatusColor(
                              items.difficulty
                            ),
                          }}
                        ></div>
                        <p
                          className="text-[14px] font-[400] leading-[24px] w-[30%] ml-[10px]"
                          style={{
                            color: DifficultyStatusColor(items.difficulty),
                          }}
                        >
                          {" "}
                          {items.difficulty}
                        </p>
                      </div>

                      <div className="flex justify-center items-center ml-[20px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6 mr-[5px]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <p className="text-[14px] font-[400] leading-[24px]">
                          {" "}
                          {items.timeEstimate}
                        </p>
                      </div>
                    </div>

                    <div className="w-full flex justify-end mt-[20px]">
                      <button className="bg-[#563A9C] rounded-[4px] text-white w-[10rem] h-[2.5rem] cursor-pointer">
                        <Link to="/day1"> Start Now</Link>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* pagina */}
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
