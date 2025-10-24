import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useChallenges } from "../../Common/ChallengeContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

const ChallengeDetails = () => {
  const navigate = useNavigate();
  const { state: challenge } = useLocation();
  const { setCardsData } = useChallenges();
  const [status, setStatus] = useState(challenge.status);
  const [openInstruction, setInstruction] = useState(false);

  const DifficultyStatusColor = (status: string) => {
    if (status === "Easy") {
      return "#1E7F55";
    } else if (status === "Medium") {
      return "#B86E00";
    }

    return "#B00020";
  };
  const handleStartChallenge = async () => {
    if (status === "Not Started") {
      await fetch(`http://localhost:3001/days/${challenge.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "In Progress" }),
      });

      setCardsData((prev: any) =>
        prev.map((c: any) =>
          c.id === challenge.id ? { ...c, status: "In Progress" } : c
        )
      );

      setStatus("In Progress");
    }

    window.open("https://codesandbox.io/", "_blank");
  };

  const handleCompletebutton = async () => {
    await fetch(`http://localhost:3001/days/${challenge.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" }),
    });

    setCardsData((prev: any) =>
      prev.map((c: any) =>
        c.id === challenge.id ? { ...c, status: "Completed" } : c
      )
    );

    setStatus("Completed");
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
        <a href="/30-days-challenge" className="mr-[0.1rem] flex font-[600]">
          Challenge Hub
        </a>
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
        {openInstruction? "Hide Instructions" : "Show Instructions"}
      
      </button>
      <button
        className="px-4 py-2 bg-gray-400 text-white rounded mr-2 cursor-pointer"
        onClick={() => navigate("/30-days-challenge")}
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
