import { createContext, useContext, useEffect, useState } from "react";
import { ChallengeDaysData } from "../service/dataSerice";

const ChallengeContext = createContext<any>(null);

export const ChallengeProvider = ({ children }: any) => {
  const [CardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const res:any = await ChallengeDaysData();
      setCardsData(res);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  console.log("CardsData", CardsData)

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <ChallengeContext.Provider
      value={{ CardsData, setCardsData, loading }}
    >
      {children}
    </ChallengeContext.Provider>


  );
};

export const useChallenges = () => useContext(ChallengeContext);
