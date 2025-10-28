import { useEffect, useState } from "react";
import StartImage from "../../../assets/Images/Dashboard/Start.svg";

import { useNotes } from "../../Common/NotesContext";
import { days, months } from "../../Common/Constants";
import NotesImg from "../.../../../../assets/Images/Dashboard/Notes-pana.svg";
import { useNavigate } from "react-router-dom";
import DateCalendarServerRequest from "../../Common/Calender";
import EastIcon from "@mui/icons-material/East";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StatusGraph from "./StatusGraph";
import { getGreetingByTime, type Greeting } from "../../service/dataSerice";

const Dashboard = () => {
  const navigate = useNavigate();
  const { notes } = useNotes();

  const [GreetingMessages, setGreetingMessage] = useState<Greeting | null>(
    null
  );
  const [caption, setCaption] = useState("");

  const RandomNotesTitles1 = Math.floor(Math.random() * notes.length);
  let RandomNotesTitles2 = Math.floor(Math.random() * notes.length);

  while (RandomNotesTitles1 === RandomNotesTitles2) {
    RandomNotesTitles2 = Math.floor(Math.random() * notes.length);
  }

  const randomItems = [notes[RandomNotesTitles1], notes[RandomNotesTitles2]];

  useEffect(() => {
    const fetchGreeting = async () => {
      const data: Greeting = await getGreetingByTime();
      setGreetingMessage(data);
      const randomCaption =
        data.captions[Math.floor(Math.random() * data.captions.length)];
      setCaption(randomCaption);
    };

    fetchGreeting();
  }, []);

  const d = new Date();
  let TodayDate = d.getDate();
  let month = months[d.getMonth()];
  let Week = days[d.getDay()];

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-10">
        <h1 className="text-2xl font-bold text-[#563A9C]">
          Welcome to <span className="text-[#2b2828]">FED</span>
        </h1>
        <p className="text-lg text-[#2b2828] font-medium mt-[1rem]">
          Turn Every Day into Progress — One Challenge at a Time.
        </p>

        <div className=" justify-between flex flex-col sm:flex-row gap-1 mb-2">
          <div className="bg-gradient-to-r from-[#3E2C7A] via-[#563A9C] to-[#7A5AE0] rounded-xl shadow-sm mt-8 px-4 py-4 flex flex-col sm:flex-row justify-between w-[100%] lg:w-[70%]">
            <div className="flex flex-col justify-between">
              <div className="mt-6 sm:mt-0 bg-white/20 backdrop-blur-md px-2 py-2 rounded-lg flex items-center gap-2 w-[75%] mb-8">
                <CalendarTodayIcon sx={{ color: "white" }} />
                <p className="text-white font-medium tracking-wide">
                  {month} {TodayDate}, {Week}
                </p>
              </div>

              <div className="  mb-8">
                <p className="text-2xl sm:text-4xl font-bold text-white/90">
                  {GreetingMessages
                    ? ` ${GreetingMessages.greeting},`
                    : "Hello!"}
                </p>
                <p className="mt-[1rem] text-[20px] font-[500] text-white/90">
                  {GreetingMessages
                    ? caption
                    : "Your journey to mastery begins today — 30 days, endless possibilities."}
                </p>
                <button className="px-5 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-lg hover:bg-white/30 hover:shadow-lg mt-6 transition-all duration-200 flex items-center">
                  Let’s Go! <EastIcon className="ml-2" />
                </button>
              </div>
            </div>
            <div className="mt-8">
              <img src={StartImage} className="w-150 h-70" />
            </div>
          </div>
          <div className="mt-8 rounded-2xl shadow-lg  flex flex-col w-full lg:w-[27%]">
            <div className="bg-[#563A9C] rounded-t-lg px-4 py-4 flex justify-center items-center">
              <p className="text-lg font-semibold text-white">
                My Check-In Tracker
              </p>
            </div>

            <DateCalendarServerRequest />
          </div>
        </div>
        <div className=" justify-between flex flex-col sm:flex-row gap-1 mb-2 w-[100%]">
          <div className=" flex w-[100%] lg:w-[70%]  flex-col sm:flex-row">
            <div className="bg-white rounded-xl shadow-md my-4  w-[100%] lg:w-[50%] mr-[2rem] transition-transform hover:scale-[1.01]">
              <div className="bg-[#563A9C] rounded-t-lg px-4 py-4 flex justify-center items-center">
                <p className="text-lg font-semibold text-white">
                  React 30-days Tracker
                </p>
              </div>
              <StatusGraph />
            </div>
            <div className="bg-white rounded-2xl shadow-md  my-4 w-full lg:w-1/2 transition-transform hover:scale-[1.01]">
              <div className="bg-[#563A9C] rounded-t-lg px-4 py-4 flex justify-between items-center">
                <p className="text-lg font-semibold text-white">Notes Hub</p>
                <button
                  onClick={() => navigate("/CodePad-page")}
                  className="text-sm text-white/80 hover:text-white underline"
                >
                  View All <EastIcon className="ml-[1rem]" />
                </button>
              </div>
              <div className="mt-2 p-4">
                {randomItems.map((note) => (
                  <button
                    key={note.title}
                    className="flex justify-between border-b border-gray-200 py-3 w-full hover:bg-gray-50 transition-all text-left"
                    onClick={() => navigate("/CodePad-page")}
                  >
                    <p className="text-[18px] font-medium text-gray-800">
                      {note.title}
                    </p>
                    <p className="text-[12px] text-gray-500">{note.date}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-center items-center mt-6">
                <img src={NotesImg} alt="Notes" className="w-50 h-50 " />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between lg:w-[27%] w-full  ">
            <div className="bg-[#563A9C] rounded-xl shadow-md p-6 mb-4 mt-4 w-[100%] transition-transform hover:scale-[1.01]">
              <p className="text-white text-[16px] font-[700]">
                Plan your day, track your progress, and schedule your 30-day
                challenge tasks.
              </p>
              <button className="px-4 py-2 text-[#563A9C] bg-white rounded hover:bg-[#d9d5e4] mt-[2rem] font-[700]" onClick={() => navigate("/my-planner")}>
                Open Planner <EastIcon className="ml-[1rem]" />
              </button>
            </div>
            <div className="bg-[#563A9C] rounded-xl shadow-md p-6 mb-4 mt-4  w-[100%] transition-transform hover:scale-[1.01]">
              <p className="text-white text-[16px] font-[700]">
                Jump into more coding challenges, track progress, and level up
                your skills.
              </p>
              <button className="px-4 py-2 text-[#563A9C] bg-white rounded hover:bg-[#d9d5e4] mt-[2rem] font-[700]" onClick={() => navigate("/More-hands-on-Challenges")}>
                Let’s Go! <EastIcon className="ml-[1rem]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-16 bg-gradient-to-r from-[#563A9C] to-[#7E5CCB] text-white">
        <p className="text-2xl sm:text-3xl font-semibold italic tracking-wide">
          “Small Steps. Big Progress.”
        </p>
      </div>
    </>
  );
};

export default Dashboard

