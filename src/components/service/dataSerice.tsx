import greetingData from "../../assets/Mock-Data/Captions.json";
import challengesDataJson from "../../assets/Mock-Data/db.json";
import CustomChallengeData from "../../assets/Mock-Data/moreChallenges.json";

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

type ChallengesData = {
  days: Challenge[];
};

const challengesData: ChallengesData = {

  days: (challengesDataJson as any).days.map((c: any) => ({
    ...c,
    id: c.id.toString(),
  })),
};


export interface Greeting {
  startHour: number;
  endHour: number;
  greeting: string;
  captions: string[];
}

export const getGreetingMessages = (): Promise<Greeting[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(greetingData);
    }, 500);
  });
};


export const MoreChallenge = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CustomChallengeData.categories);
    }, 500);
  });
};


export const getGreetingByTime = (): Promise<Greeting> => {
  return new Promise((resolve) => {
    const currentHour = new Date().getHours();

    const greeting =
      greetingData.find((g: Greeting) => {
        if (g.startHour <= g.endHour) {
          return currentHour >= g.startHour && currentHour <= g.endHour;
        } else {
          return currentHour >= g.startHour || currentHour <= g.endHour;
        }
      }) || greetingData[0];

    setTimeout(() => resolve(greeting), 500);
  });
};


export const ChallengeDaysData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(challengesData.days);
    }, 500);
  });
};


const findChallengeById = (
  id: string
): { challenge: Challenge | undefined; source: "db" | "custom" } => {

  let challenge = challengesData.days.find((c) => c.id === id);
  if (challenge) return { challenge, source: "db" };
  for (const category of CustomChallengeData.categories) {
    const found = category.challenges.find(
      (c: any) => c.id.toString() === id
    );
    if (found)
      return {
        challenge: { ...found, id: found.id.toString() },
        source: "custom",
      };
  }

  return { challenge: undefined, source: "db" };
};

export const getChallengeById = (id: string) => {
  return new Promise<Challenge | undefined>((resolve) => {
    const storedData = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
    const { challenge } = findChallengeById(id);

    if (challenge && storedData[id]) {
      Object.assign(challenge, storedData[id]);
    }

    setTimeout(() => resolve(challenge), 300);
  });
};

export const updateChallengeStatus = (id: string, status: string) => {
  return new Promise<Challenge | undefined>((resolve) => {
    const { challenge, source } = findChallengeById(id);
    if (!challenge) {
      resolve(undefined);
      return;
    }

    challenge.status = status;

    if (source === "db") {
      const index = challengesData.days.findIndex((c) => c.id === id);
      if (index !== -1) challengesData.days[index].status = status;
    } else if (source === "custom") {
      for (const category of CustomChallengeData.categories) {
        const idx = category.challenges.findIndex(
          (c: any) => c.id.toString() === id
        );
        if (idx !== -1)
          category.challenges[idx].status = status;
      }
    }

    const storedData = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
    storedData[id] = { ...storedData[id], status };
    localStorage.setItem("challengesStatus", JSON.stringify(storedData));

    setTimeout(() => resolve(challenge), 300);
  });
};
