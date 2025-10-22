import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useChallenges } from "../../Common/challengeContext";

const ChallengeDetails = () => {
  const navigate = useNavigate();
  const { state: challenge } = useLocation();
 const {  setCardsData } = useChallenges();
  const [status, setStatus] = useState(challenge.status);

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
    <div>
      <p>{challenge.dayChallenge}</p>
      <p>{challenge.title}</p>
      <p>{challenge.topic}</p>
      <p>{challenge.longDescription}</p>
      <img src={challenge.icon} className="w-5 h-5" />
      <p>{challenge.difficulty}</p>
      <p>{challenge.timeEstimate}</p>

      <button
        className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
        onClick={() => navigate("/30-days-challenge")}
      >
        Back
      </button>

      <button
        className="px-4 py-2 bg-[#563A9C] text-white rounded hover:bg-[#472F85] mr-2"
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
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleCompletebutton}
        >
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default ChallengeDetails;
