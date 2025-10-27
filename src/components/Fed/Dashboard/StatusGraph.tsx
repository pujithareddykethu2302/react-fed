import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useChallenges } from "../../Common/ChallengeContext";

ChartJs.register(ArcElement, Tooltip, Legend);

const StatusGraph = () => {
  const { CardsData } = useChallenges();

  const getMergedCardsData = () => {
    const stored = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
    return CardsData.map((c: any) =>
      stored[c.id] ? { ...c, ...stored[c.id] } : c
    );
  };

  const mergedCardsData = getMergedCardsData();

  const Completed = mergedCardsData.filter((i: any) => i.status === "Completed").length;
  const NotYetStarted = mergedCardsData.filter((i: any) => i.status === "Not Started").length;
  const InProgress = mergedCardsData.filter((i: any) => i.status === "In Progress").length;

  const data = {
    labels: ["Completed", "In Progress", "Not Started"], 
    datasets: [
      {
        label: "30-Days Challenge Tracker",
        data: [Completed, InProgress, NotYetStarted], 
        backgroundColor: ["#563A9C", "#8E6CF2", "#E5E2F5"],
        borderWidth: 0,
      },
    ],
  };

const options = {
  cutout: "70%",
  plugins: {
     legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        color: "#333",
        usePointStyle: true, 
        pointStyle: "circle", 
        boxWidth: 8,        
        boxHeight: 8,         
        font: {
          size: 12,
        },
      },
    },
  },
};



  return (
    <div className="mt-[1rem] px-7">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default StatusGraph;
