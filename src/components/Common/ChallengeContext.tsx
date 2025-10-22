import { createContext, useContext, useEffect, useState } from "react";

const ChallengeContext = createContext<any>(null);

export const ChallengeProvider = ({ children }: any) => {
  const [CardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/days");
      const data = await res.json();
      setCardsData(data);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <ChallengeContext.Provider
      value={{ CardsData, setCardsData, loading, fetchChallenges }}
    >
      {children}
    </ChallengeContext.Provider>


  );
};

export const useChallenges = () => useContext(ChallengeContext);
