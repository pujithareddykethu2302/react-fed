import React from "react";
import { useChallenges } from "../../Common/ChallengeContext";
import { useNavigate } from "react-router-dom";

const MoreChallenges = () => {
  const navigate = useNavigate();

  const { CustomCardsChallengeData, setSelectedCategory } = useChallenges();

  const handleButtonChallenge = (categoryName: string, challenges: any[]) => {
    setSelectedCategory({ name: categoryName, challenges });
    navigate(`/More-hands-on-Challenges/${categoryName}`);
  };

  return (
    <div className="p-6">
      <p className="text-[32px] font-[700] text-[#080809] mb-6">
        From Ideas to Execution — Pick Your Next Challenge
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CustomCardsChallengeData.map((data: any) => {
          return (
            <div
              className="bg-[#fcfaff] p-6 rounded-2xl shadow-md min-h-[320px] flex flex-col justify-between items-center 
                border border-transparent hover:border-[#563A9C]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-center px-4">
                <p className="font-bold text-[#563A9C] text-2xl mb-3">
                  {data.name}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {data.description}
                </p>
              </div>

              <button
                onClick={() =>
                  handleButtonChallenge(data.name, data.challenges)
                }
                className="mt-6 bg-gradient-to-r from-[#563A9C] to-[#7c5bdb] hover:from-[#472e85] hover:to-[#6540b5]
               text-white font-medium rounded-lg px-6 py-2.5 transition-all shadow-md hover:shadow-lg"
              >
                View Challenge
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreChallenges;
