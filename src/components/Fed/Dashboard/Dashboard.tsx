import { useEffect, useState } from "react";
import StartImage from "../../../assets/Images/Dashboard/Start.svg";
import { getGreetingByTime, type Greeting } from "../../service/dataSerice";
import { useNotes } from "../../Common/NotesContext";
import { days, months } from "../../Common/Constants";
import NotesImg from "../.../../../../assets/Images/Dashboard/Notes-pana.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { notes } = useNotes();
  console.log("notes", notes);
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

  console.log(randomItems);

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

  console.log("date", TodayDate, month, Week);
  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <p>Dashboard</p>
      <div className=" justify-between flex flex-col sm:flex-row gap-1 mb-2">
        <div className="bg-white rounded-xl shadow-md p-6 mb-2 mt-8 flex flex-col sm:flex-row justify-between w-[100%] lg:w-[70%]">
          <div className="mt-[2rem]">
            <p className="text-2xl sm:text-4xl font-bold">
              {GreetingMessages
                ? `Hello!, ${GreetingMessages.greeting}`
                : "Hello!"}
            </p>
            <p className="mt-[1rem] text-[20px] font-[500] text-[#563A9C]">
              {GreetingMessages
                ? caption
                : "Your journey to mastery begins today — 30 days, endless possibilities."}
            </p>
            <button className="px-4 py-2 bg-[#563A9C] text-white rounded hover:bg-[#472F85] mt-[2rem]">
              Let’s Go!
            </button>
          </div>
          <div>
            <img src={StartImage} className="w-70 h-70" />
          </div>
        </div>
        <div className="mt-8 rounded-2xl shadow-lg  flex flex-col w-full lg:w-[27%]">
          <div className="bg-white w-full text-[#563A9C] flex flex-row justify-between">
            <p>{month}</p>
            <p>{Week}</p>
          </div>
          <div className="bg-[#563A9C] w-full">
          <p className="text-[32px] font-extrabold">{TodayDate}</p>
          </div>
    
       
        </div>
      </div>
      <div className=" justify-between flex flex-col sm:flex-row gap-1 mb-2 w-[100%]">
        <div className=" flex w-[100%] lg:w-[70%]">
          <div className="bg-white rounded-xl shadow-md p-6 my-8  w-[100%] lg:w-[50%] mr-[2rem] transition-transform hover:scale-[1.01]">
            <p>status graph </p>
            <button className="px-4 py-2 bg-[#563A9C] text-white rounded hover:bg-[#472F85] mt-[2rem]">
              Let’s Go!
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 my-8 w-full lg:w-1/2 transition-transform hover:scale-[1.01]">
            <div className="bg-[#563A9C] rounded-lg px-4 py-2 flex justify-between items-center">
              <p className="text-lg font-semibold text-white">Notes Hub</p>
              <button
                onClick={() => navigate("/CodePad-page")}
                className="text-sm text-white/80 hover:text-white underline"
              >
                View All
              </button>
            </div>
            <div className="mt-4">
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
              <img src={NotesImg} alt="Notes" className="w-40 h-40 " />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-[27%]">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 mt-8  w-[100%] transition-transform hover:scale-[1.01]">
            <p>plannere</p>
            <button className="px-4 py-2 bg-[#563A9C] text-white rounded hover:bg-[#472F85] mt-[2rem]">
              Let’s Go!
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 mt-8  w-[100%] transition-transform hover:scale-[1.01]">
            <p>Other challenge </p>
            <button className="px-4 py-2 bg-[#563A9C] text-white rounded hover:bg-[#472F85] mt-[2rem]">
              Let’s Go!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
