import { createContext, use, useContext, useEffect, useState } from "react";
import { ChallengeDaysData, MoreChallenge } from "../service/dataSerice";

const ChallengeContext = createContext<any>(null);

export const ChallengeProvider = ({ children }: any) => {
  const [CardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [CustomCardsChallengeData, setCustomCardsChallengeData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);


  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const res: any = await ChallengeDaysData();
      setCardsData(res);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    const fetchMoreChallengeData = async () => {
      try {
        setLoading(true);
        const res: any = await MoreChallenge();
        setCustomCardsChallengeData(res);
      } catch (err) {
        console.error("Error fetching challenges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreChallengeData();
  }, []);

  return (
    <ChallengeContext.Provider value={{ CardsData, setCardsData, loading , CustomCardsChallengeData, setCustomCardsChallengeData, selectedCategory,
    setSelectedCategory,}}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => useContext(ChallengeContext);
