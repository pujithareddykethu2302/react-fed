import { useState } from "react";
import { useChallenges } from "../../Common/ChallengeContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CategoryChallenges = () => {
  const { state } = useLocation();
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { selectedCategory } = useChallenges();

  const challenges = state?.challenges || selectedCategory?.challenges || [];

  const DifficultyStatusColor = (status: string) => {
    if (status === "Easy") return "#1E7F55";
    if (status === "Medium") return "#B86E00";
    return "#B00020";
  };

  const [CurrentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const TotalPages = Math.ceil(challenges.length / pageSize);
  const PageNumbers = Array.from({ length: TotalPages }, (_, i) => i + 1);
  const startIndex = (CurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const AfterPaginationDisplayData = challenges.slice(startIndex, endIndex);

  return (
    <div className="p-6">
        <div className="flex items-center mt-1">
        <a href="/More-hands-on-Challenges" className="font-bold">More Challenges</a>

        <NavigateNextIcon fontSize="small" />
        <p className="mr-[1rem] my-[2rem]">
          {categoryName}
        </p>
      </div>
      <h2 className="text-3xl font-bold text-[#563A9C] mb-6 flex justify-center items-center">{categoryName}</h2>

      {challenges.length === 0 ? (
        <p>No challenges found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AfterPaginationDisplayData.map((challenge: any) => (
            <div
              key={challenge.title}
              className="bg-[#fcfaff] p-6 rounded-xl shadow-md flex flex-col justify-between hover:scale-[1.02] transition-all"
            >
              <div className="flex justify-between mb-2">
                <p className="text-[25px] font-bold text-[#050405]">
                  {challenge.title}
                </p>
                <img src={challenge.icon} className="w-5 h-5" />
              </div>

              <p className="text-[20px] font-bold  text-[#563A9C] my-2">
                {challenge.topic}
              </p>
              <p className="text-[16px]  text-[#050405] ">
                {challenge.shortDescription}
              </p>

              <div
                className={`w-[6rem] h-6 flex items-center justify-center rounded-md my-4 border`}
                style={{
                  backgroundColor:
                    challenge.status === "In Progress"
                      ? "#FFF8E1"
                      : challenge.status === "Completed"
                      ? "#E8F5E9"
                      : "#FFF2F3",
                  borderColor:
                    challenge.status === "In Progress"
                      ? "#FBC02D"
                      : challenge.status === "Completed"
                      ? "#1E7F55"
                      : "#DF001A",
                }}
              >
                <p
                  className="text-xs font-medium"
                  style={{
                    color:
                      challenge.status === "In Progress"
                        ? "#FBC02D"
                        : challenge.status === "Completed"
                        ? "#1E7F55"
                        : "#DF001A",
                  }}
                >
                  {challenge.status}
                </p>
              </div>

              <div className="flex items-center gap-4 my-4 flex-wrap justify-between">
                <div className="flex items-center gap-2 ">
                  <div
                    className="rounded-full w-3 h-3 border"
                    style={{
                      backgroundColor: DifficultyStatusColor(
                        challenge.difficulty
                      ),
                      borderColor: DifficultyStatusColor(challenge.difficulty),
                    }}
                  />
                  <p
                    className="text-sm"
                    style={{
                      color: DifficultyStatusColor(challenge.difficulty),
                    }}
                  >
                    {challenge.difficulty}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <ScheduleIcon />
                  <p className="text-sm">{challenge.timeEstimate}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/More-hands-on-Challenges/${categoryName}/challenge-details/${challenge.title}`,
                    { state: challenge }
                  )
                }
                className="bg-[#563A9C] text-white py-2 rounded-lg hover:bg-[#472e85] transition-all"
              >
                  {challenge.status === "In Progress"
                        ? "Continue"
                        : challenge.status === "Completed"
                        ? "Completed"
                        : "Start Now"}
              </button>
            </div>
          ))}
        </div>
      )}

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
  );
};

export default CategoryChallenges;
