import { useState, useEffect } from "react";
import { useChallenges } from "../../Common/ChallengeContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { updateChallengeStatus } from "../../service/dataSerice";
import NoData from "../../../assets/Images/ChallengesPage/Empty-cuate.svg";

const CategoryChallenges = () => {
  const { state } = useLocation();
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useChallenges();

  const [challenges, setChallenges] = useState<any[]>([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const DifficultyStatusColor = (status: string) => {
    if (status === "Easy") return "#1E7F55";
    if (status === "Medium") return "#B86E00";
    return "#B00020";
  };

  const loadChallenges = () => {
    const localStored = JSON.parse(localStorage.getItem("selectedCategory") || "{}");

    const data =
      state?.challenges ||
      selectedCategory?.challenges ||
      localStored?.challenges ||
      [];

    const storedStatus = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
    const merged = data.map((c: any) =>
      storedStatus[c.id] ? { ...c, ...storedStatus[c.id] } : c
    );

    setChallenges(merged);

    if (!selectedCategory && localStored?.name)
      setSelectedCategory(localStored);
  };

  useEffect(() => {
    loadChallenges();
  }, [state, selectedCategory]);

  useEffect(() => {
    window.addEventListener("storage", loadChallenges);
    return () => window.removeEventListener("storage", loadChallenges);
  }, []);

 const TotalPages = Math.ceil(challenges.length / pageSize);
  const PageNumbers = Array.from({ length: TotalPages }, (_, i) => i + 1);
  const startIndex = (CurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
const AfterPaginationDisplayData = challenges.slice(startIndex, endIndex);

  const handleStatusUpdate = async (challenge: any, newStatus: string) => {
    await updateChallengeStatus(challenge.id, newStatus);

    const stored = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
    stored[challenge.id] = { ...stored[challenge.id], status: newStatus };
    localStorage.setItem("challengesStatus", JSON.stringify(stored));
    window.dispatchEvent(new Event("storage"));

    setChallenges((prev) =>
      prev.map((c) => (c.id === challenge.id ? { ...c, status: newStatus } : c))
    );

    if (newStatus === "In Progress") window.open("https://codesandbox.io/", "_blank");
  };

  return (
    <div className="p-6">
      <div className="flex items-center mt-1">
        <a href="/More-hands-on-Challenges" className="font-bold">
          More Challenges
        </a>
        <NavigateNextIcon fontSize="small" />
        <p className="mr-[1rem] my-[2rem]">{categoryName}</p>
      </div>

      <h2 className="text-3xl font-bold text-[#563A9C] mb-6 text-center">
        {categoryName}
      </h2>

      {challenges.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[70vh]">
          <img src={NoData} className="w-[25rem] h-[25rem]" alt="No data" />
          <p className="mt-4 text-[#563A9C] text-lg font-semibold">
            No challenges found for this category.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AfterPaginationDisplayData.map((challenge: any) => (
              <div
                key={challenge.id}
                className="bg-[#fcfaff] p-6 rounded-xl shadow-md flex flex-col justify-between hover:scale-[1.02] transition-all"
              >
                <div className="flex justify-between mb-2">
                  <p className="text-[25px] font-bold text-[#050405]">
                    {challenge.title}
                  </p>
                  {challenge.icon && <img src={challenge.icon} className="w-5 h-5" />}
                </div>

                <p className="text-[20px] font-bold text-[#563A9C] my-2">
                  {challenge.topic}
                </p>
                <p className="text-[16px] text-[#050405]">
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

                <div className="flex items-center gap-4 my-4 justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-full w-3 h-3 border"
                      style={{
                        backgroundColor: DifficultyStatusColor(challenge.difficulty),
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
                  onClick={() => {
                    if (challenge.status === "Not Started") {
                      handleStatusUpdate(challenge, "In Progress");
                    } else {
                      navigate(
                        `/More-hands-on-Challenges/${categoryName}/challenge-details/${challenge.title}`,
                        { state: challenge }
                      );
                    }
                  }}
                  className={`py-2 rounded-lg text-white transition-all ${
                    challenge.status === "Completed"
                      ? "bg-green-600"
                      : "bg-[#563A9C] hover:bg-[#472e85]"
                  }`}
                >
                  {challenge.status === "In Progress"
                    ? "Continue"
                    : challenge.status === "Completed"
                    ? "View Code"
                    : "Start Now"}
                </button>
              </div>
            ))}
          </div>
        </>
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
