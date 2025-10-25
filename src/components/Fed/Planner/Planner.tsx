import { useState } from "react";
import ScheduleImage from "../../../assets/Images/Planner/Schedule-amico.svg";
import goalsData from "../../../assets/Mock-Data/goals.json"; // your JSON file

interface Goal {
  text: string;
  completed: boolean;
}

const Planner = () => {

  const loadGoals = (key: string, defaultGoals: Goal[]) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultGoals;
  };

  const [monthlyGoals, setMonthlyGoals] = useState<Goal[]>(() => loadGoals("monthlyGoals", goalsData.monthlyGoals));
  const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>(() => loadGoals("weeklyGoals", goalsData.weeklyGoals));
  const [dailyGoals, setDailyGoals] = useState<Goal[]>(() => loadGoals("dailyGoals", goalsData.dailyGoals));

  const [monthlyText, setMonthlyText] = useState("");
  const [weeklyText, setWeeklyText] = useState("");
  const [dailyText, setDailyText] = useState("");

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.toLocaleDateString("default", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const currentWeek = Math.ceil(currentDate.getDate() / 7);

  const saveGoals = (key: string, goals: Goal[]) => localStorage.setItem(key, JSON.stringify(goals));

  const handleAddGoal = (type: "monthly" | "weekly" | "daily") => {
    if (type === "monthly" && monthlyText.trim()) {
      const updated = [...monthlyGoals, { text: monthlyText, completed: false }];
      setMonthlyGoals(updated);
      saveGoals("monthlyGoals", updated);
      setMonthlyText("");
    } else if (type === "weekly" && weeklyText.trim()) {
      const updated = [...weeklyGoals, { text: weeklyText, completed: false }];
      setWeeklyGoals(updated);
      saveGoals("weeklyGoals", updated);
      setWeeklyText("");
    } else if (type === "daily" && dailyText.trim()) {
      const updated = [...dailyGoals, { text: dailyText, completed: false }];
      setDailyGoals(updated);
      saveGoals("dailyGoals", updated);
      setDailyText("");
    }
  };

  const toggleCompleted = (type: "monthly" | "weekly" | "daily", index: number) => {
    const update = (goals: Goal[], key: string) => {
      const updated = goals.map((g, i) => (i === index ? { ...g, completed: !g.completed } : g));
      saveGoals(key, updated);
      return updated;
    };

    if (type === "monthly") setMonthlyGoals(update(monthlyGoals, "monthlyGoals"));
    else if (type === "weekly") setWeeklyGoals(update(weeklyGoals, "weeklyGoals"));
    else if (type === "daily") setDailyGoals(update(dailyGoals, "dailyGoals"));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-[#563A9C] mb-2">Goal Planner</h1>
      <p className="text-gray-600 mb-8">
        Plan your monthly, weekly, and daily goals to stay consistent and organized.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-[#563A9C] mb-1">Monthly Goals</h2>
          <p className="text-gray-500 mb-4">{currentMonth} {currentYear}</p>
          <div className="flex gap-3 mb-4">
            <input type="text" placeholder="Add monthly goal..." value={monthlyText} onChange={(e) => setMonthlyText(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C]" />
            <button onClick={() => handleAddGoal("monthly")} className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg">+</button>
          </div>
          <ul className="space-y-2">
            {monthlyGoals.map((goal, i) => (
              <li key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-3 rounded-lg text-gray-700">
                <input type="checkbox" checked={goal.completed} onChange={() => toggleCompleted("monthly", i)} />
                <span className={goal.completed ? "line-through text-gray-400" : ""}>{goal.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-[#563A9C] mb-1">Weekly Goals</h2>
          <p className="text-gray-500 mb-4">Week {currentWeek} - {currentMonth} {currentYear}</p>
          <div className="flex gap-3 mb-4">
            <input type="text" placeholder="Add weekly goal..." value={weeklyText} onChange={(e) => setWeeklyText(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C]" />
            <button onClick={() => handleAddGoal("weekly")} className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg">+</button>
          </div>
          <ul className="space-y-2">
            {weeklyGoals.map((goal, i) => (
              <li key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-3 rounded-lg text-gray-700">
                <input type="checkbox" checked={goal.completed} onChange={() => toggleCompleted("weekly", i)} />
                <span className={goal.completed ? "line-through text-gray-400" : ""}>{goal.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-[#563A9C] mb-1">Daily Goals</h2>
          <p className="text-gray-500 mb-4">{currentDay}</p>
          <div className="flex gap-3 mb-4">
            <input type="text" placeholder="Add daily goal..." value={dailyText} onChange={(e) => setDailyText(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#563A9C]" />
            <button onClick={() => handleAddGoal("daily")} className="bg-[#563A9C] hover:bg-[#472F85] text-white px-4 py-2 rounded-lg">+</button>
          </div>
          <ul className="space-y-2">
            {dailyGoals.map((goal, i) => (
              <li key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-3 rounded-lg text-gray-700">
                <input type="checkbox" checked={goal.completed} onChange={() => toggleCompleted("daily", i)} />
                <span className={goal.completed ? "line-through text-gray-400" : ""}>{goal.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="mt-16 bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center p-8 gap-8">
        <div className="flex-1">
          <p className="text-2xl font-semibold text-[#563A9C] mb-4">"Small Steps. Big Progress."</p>
          <p className="text-gray-600">Keep planning consistently and watch your goals turn into achievements.</p>
        </div>
        <div className="flex-1">
          <img src={ScheduleImage} alt="Planner Illustration" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Planner;
