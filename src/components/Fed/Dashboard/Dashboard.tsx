import { useEffect, useState } from "react";
import StartImage from "../../../assets/Images/Dashboard/Start.svg";
import { getGreetingByTime, type Greeting } from "../../service/dataSerice";

const Dashboard = () => {
  const [GreetingMessages, setGreetingMessage] = useState<Greeting | null>(
    null
  );
  const [caption, setCaption] = useState("");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
      <div className=" justify-between flex flex-col sm:flex-row gap-3 mb-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 mt-8 flex flex-col sm:flex-row justify-between w-[100%] lg:w-[70%]">
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
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 mt-8 flex justify-between w-[100%] lg:w-[27%]">
          <p>
            {TodayDate}
          </p>
          <p>
            {month}
          </p>
          <p>{Week}</p>
        </div>
      </div>
      <div>
         
      </div>
    </div>
  );
};

export default Dashboard;
