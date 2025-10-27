import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useChallenges } from "../../Common/ChallengeContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import {
  getChallengeById,
  updateChallengeStatus,
} from "../../service/dataSerice";

const ChallengeDetails = () => {
  const navigate = useNavigate();
  const { state: challenge } = useLocation();
  const { categoryName } = useParams();

  const { setCardsData } = useChallenges();
  const [status, setStatus] = useState(challenge.status);
  const [openInstruction, setInstruction] = useState(false);
  const [challnege, setChallenge] = useState<any>();

  const DifficultyStatusColor = (status: string) => {
    if (status === "Easy") {
      return "#1E7F55";
    } else if (status === "Medium") {
      return "#B86E00";
    }

    return "#B00020";
  };

  useEffect(() => {
    const fetchChallenge = async () => {
      const storedData = JSON.parse(
        localStorage.getItem("challengesStatus") || "{}"
      );
      let data = await getChallengeById(challenge.id);

      if (storedData[challenge.id]) {
        data = { ...data, ...storedData[challenge.id] };
      }

      setChallenge(data);
      setStatus(data?.status);
    };

    fetchChallenge();
  }, [challenge.id]);

  const handleStartChallenge = async () => {
    if (status === "Not Started") {
      const updatedChallenge = await updateChallengeStatus(
        challenge.id,
        "In Progress"
      );

      if (updatedChallenge) {
        // update localStorage
        const storedData = JSON.parse(
          localStorage.getItem("challengesStatus") || "{}"
        );
        storedData[challenge.id] = {
          ...storedData[challenge.id],
          status: "In Progress",
        };
        localStorage.setItem("challengesStatus", JSON.stringify(storedData));

        setCardsData((prev: any) =>
          prev.map((c: any) =>
            c.id === challenge.id ? { ...c, status: "In Progress" } : c
          )
        );

        setChallenge(updatedChallenge);
        setStatus("In Progress");
      }
    }

    window.open("https://codesandbox.io/", "_blank");
  };

  const handleCompletebutton = async () => {
    const updatedChallenge = await updateChallengeStatus(
      challenge.id,
      "Completed"
    );

    if (updatedChallenge) {
      // update localStorage
      const storedData = JSON.parse(
        localStorage.getItem("challengesStatus") || "{}"
      );
      storedData[challenge.id] = {
        ...storedData[challenge.id],
        status: "Completed",
      };
      localStorage.setItem("challengesStatus", JSON.stringify(storedData));

      setCardsData((prev: any) =>
        prev.map((c: any) =>
          c.id === challenge.id ? { ...c, status: "Completed" } : c
        )
      );

      const updateLocalStorageStatus = (id: string, status: string) => {
        const stored = JSON.parse(
          localStorage.getItem("challengesStatus") || "{}"
        );
        stored[id] = { status };
        localStorage.setItem("challengesStatus", JSON.stringify(stored));
      };

      setChallenge(updatedChallenge);
      setStatus("Completed");
      updateLocalStorageStatus(challenge.id, "Completed");
    }

    navigate("/30-days-challenge");
  };

  return (
    <div className="p-4">
      <div className="flex w-full justify-center items-center">
        <p className=" text-[2rem] font-[800]">
          {" "}
          🚀 Level Up Your React Skills!
        </p>
      </div>
      <div className="flex items-center mt-1">
        <button
          className="mr-[0.1rem] flex font-[600] cursor-pointer"
          onClick={() => {
            if (categoryName) {
              navigate(`/More-hands-on-Challenges/${categoryName}`);
            } else {
              navigate("/30-days-challenge");
            }
          }}
        >
          Challenge Hub
        </button>

        <NavigateNextIcon fontSize="small" />
        <p className="mr-[1rem]">
          {challenge.dayChallenge} - {challenge.title}
        </p>
      </div>
      <div className="border border-[#E0E0E0] rounded-[8px] mt-[2rem] mb-[2rem] p-[2rem]">
        <div className="flex justify-between">
          <p className=" text-[2rem] font-[800]">
            {challenge.dayChallenge} - {challenge.title}
          </p>
          <img src={challenge.icon} className="w-20 h-20" />
        </div>

        <div className="w-[100%] flex justify-between mt-[1rem] mb-[1rem]">
          <div>
            <p className="font-[800] leading-[32px] mb-[0.5rem]">
              Concept: <span>{challenge.topic}</span>
            </p>
            <p className="font-serif italic text-gray-700 mb-[0.5rem]">
              {challenge.shortDescription}
            </p>
          </div>

          <div className="">
            <div className="flex items-center mb-[1rem]">
              <p className="mr-[0.5rem] font-[600]"> Difficulty: </p>
              <div
                className="rounded-[10px] border w-[10px] h-[10px]"
                style={{
                  backgroundColor: DifficultyStatusColor(challenge.difficulty),
                  borderColor: DifficultyStatusColor(challenge.difficulty),
                }}
              ></div>
              <p
                className="text-[14px] font-[400] leading-[24px] w-[30%] ml-[10px]"
                style={{
                  color: DifficultyStatusColor(challenge.difficulty),
                }}
              >
                {" "}
                {challenge.difficulty}
              </p>
            </div>
            <p>
              <span>
                <AccessTimeOutlinedIcon />{" "}
              </span>
              {challenge.timeEstimate}
            </p>
          </div>
        </div>

        <p className=" mb-[0.5rem]"> {challenge.longDescription}</p>

        <div className="mt-[1rem] mb-[1rem]">
          <p>
            {" "}
            <TipsAndUpdatesOutlinedIcon sx={{ color: "#FBC02D" }} /> Learn
            Points:{" "}
          </p>
          {challenge.learnPoints.map((point: string, index: any) => (
            <p key={index} className="p-[0.2rem] pl-[4rem]">
              • {point}
            </p>
          ))}
        </div>

        <p className="font-[800] leading-[32px] mb-[0.5rem]">
          {" "}
          Tip: <span>{challenge.tip}</span>
        </p>
      </div>
      <button
        className="px-4 py-2 bg-[#FBC02D] text-white rounded mr-2 cursor-pointer"
        onClick={() => {
          setInstruction(!openInstruction);
        }}
      >
        {openInstruction ? "Hide Instructions" : "Show Instructions"}
      </button>
      <button
        className="px-4 py-2 bg-gray-400 text-white rounded mr-2 cursor-pointer"
        onClick={() => {
          if (categoryName) {
            navigate(`/More-hands-on-Challenges/${categoryName}`);
          } else {
            navigate("/30-days-challenge");
          }
        }}
      >
        Back
      </button>

      <button
        className="px-4 py-2 bg-[#563A9C] text-white rounded hover:bg-[#472F85] mr-2 cursor-pointer"
        onClick={handleStartChallenge}
      >
        {status === "Completed"
          ? "View Code"
          : status === "In Progress"
          ? "Continue Challenge"
          : "Start Challenge"}
      </button>

      {status !== "Completed" && (
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          onClick={handleCompletebutton}
        >
          Mark as Complete
        </button>
      )}

      {openInstruction && (
        <div className="border border-[#FBC02D] rounded-[8px] p-8 bg-white shadow-sm mt-[3rem]">
          <p className="text-gray-800 space-y-4">
            <span className="font-semibold text-lg">
              📋 How to Use This Challenge
            </span>
            <br />
            Follow the buttons below to manage your challenge progress.
            <br />
            <br />
            <span className="font-semibold">Start Challenge:</span>
            <br />
            Click this to begin working on today’s challenge. It will unlock
            your challenge environment in CodeSandbox.
            <br />
            <br />
            <span className="font-semibold">Continue:</span>
            <br />
            If you’ve already started but not finished, use this button to
            reopen your workspace and continue where you left off.
            <br />
            <br />
            <span className="font-semibold">Mark Complete:</span>
            <br />
            When you’re done coding and satisfied with your solution, click this
            to mark the challenge as completed. This updates your progress and
            unlocks “View Code.”
            <br />
            <br />
            <span className="font-semibold">View Code:</span>
            <br />
            Opens your CodeSandbox (or future integrated editor) to revisit or
            showcase your solution.
            <br />
            <br />
            <span className="font-semibold">Back:</span>
            <br />
            Returns to the main Challenge Hub where all days are listed.
            <br />
            <br />
            <span className="italic text-yellow-700">💡 Tip:</span> Don’t rush —
            spend time understanding the “Learn Points” before marking complete.
            Each challenge builds your foundation for the next.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetails;
