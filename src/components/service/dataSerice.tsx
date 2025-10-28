

type Challenge = {
  id: string;
  dayChallenge?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  topic: string;
  difficulty: string;
  timeEstimate: string;
  icon: string;
  status: string;
  learnPoints: string[];
  tip: string;
  previewImg?: string;
};

export interface Greeting {
  startHour: number;
  endHour: number;
  greeting: string;
  captions: string[];
}


export const getGreetingMessages = async (): Promise<Greeting[]> => {
  const res = await fetch(`${import.meta.env.BASE_URL}data/Captions.json`);
  return await res.json();
};

export const getGoalsData = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}data/goals.json`);
  const data = await res.json();
  return data; 
};


export const ChallengeDaysData = async (): Promise<Challenge[]> => {
  const res = await fetch(`${import.meta.env.BASE_URL}data/db.json`);
  const data = await res.json();
  return data.days.map((c: any) => ({ ...c, id: c.id.toString() }));
};

export const MoreChallenge = async (): Promise<any[]> => {
  const res = await fetch(`${import.meta.env.BASE_URL}data/moreChallenges.json`);
  const data = await res.json();
  return data.categories;
};


export const getChallengeById = async (id: string) => {
  const days = await ChallengeDaysData();
  const more = await MoreChallenge();

  let challenge = days.find((c) => c.id === id);
  if (!challenge) {
    for (const category of more) {
      const found = category.challenges.find((c: any) => c.id.toString() === id);
      if (found) {
        challenge = { ...found, id: found.id.toString() };
        break;
      }
    }
  }

  const storedData = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
  if (challenge && storedData[id]) {
    Object.assign(challenge, storedData[id]);
  }

  return challenge;
};

export const updateChallengeStatus = async (id: string, status: string) => {
  const storedData = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
  storedData[id] = { ...storedData[id], status };
  localStorage.setItem("challengesStatus", JSON.stringify(storedData));

  const challenge = await getChallengeById(id);
  if (challenge) challenge.status = status;
  return challenge;
};


export const getGreetingByTime = async (): Promise<Greeting> => {
  const res = await fetch(`${import.meta.env.BASE_URL}data/Captions.json`);
  const greetingData: Greeting[] = await res.json();

  const currentHour = new Date().getHours();

  // Find which greeting fits the current hour
  const greeting =
    greetingData.find((g) => {
      if (g.startHour <= g.endHour) {
        // normal range (e.g., 6–11)
        return currentHour >= g.startHour && currentHour <= g.endHour;
      } else {
        // overnight range (e.g., 22–4)
        return currentHour >= g.startHour || currentHour <= g.endHour;
      }
    }) || greetingData[0]; // fallback to first if nothing matches

  return greeting;
};
