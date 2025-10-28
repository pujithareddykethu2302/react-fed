import { createContext, useContext, useEffect, useState } from "react";
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

  const fetchMoreChallengeData = async () => {
    try {
      setLoading(true);
      const res: any = await MoreChallenge();
      setCustomCardsChallengeData(res);
    } catch (err) {
      console.error("Error fetching more challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
    fetchMoreChallengeData();
    const stored = localStorage.getItem("selectedCategory");
    if (stored) setSelectedCategory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (selectedCategory)
      localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
  }, [selectedCategory]);

  return (
    <ChallengeContext.Provider
      value={{
        setLoading,
        CardsData,
        setCardsData,
        loading,
        CustomCardsChallengeData,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => useContext(ChallengeContext);
