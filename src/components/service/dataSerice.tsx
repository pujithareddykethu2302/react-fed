

import greetingData from "../../assets/Mock-Data/Captions.json"
import challengesDataJson from "../../assets/Mock-Data/db.json"

type Challenge = {
  id: string;
  dayChallenge: string;
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
  previewImg: string;
};

type ChallengesData = {
  days: Challenge[];
};

const challengesData: ChallengesData = challengesDataJson as any;

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


export const getGreetingByTime = (): Promise<Greeting> => {
  return new Promise((resolve) => {
    const currentHour = new Date().getHours();

    const greeting = greetingData.find((g: Greeting) => {
      if (g.startHour <= g.endHour) {
        return currentHour >= g.startHour && currentHour <= g.endHour;
      } else {
        return currentHour >= g.startHour || currentHour <= g.endHour;
      }
    }) || greetingData[0]; 

    setTimeout(() => resolve(greeting), 500);
  });
};

export const ChallengeDaysData = () =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(challengesData.days)
        }, 500)
    })
}

export const getChallengeById = (id: string) => {
  return new Promise<Challenge | undefined>((resolve) => {
    const storedData = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
    let challenge = challengesData.days.find((c) => c.id.toString() === id);

    if (storedData[id]) {
      challenge = { ...challenge, ...storedData[id] };
    }

    setTimeout(() => resolve(challenge), 300);
  });
};

export const updateChallengeStatus = (id: string, status: string) => {
  return new Promise<Challenge | undefined>((resolve) => {
    const challengeIndex = challengesData.days.findIndex((c) => c.id.toString() === id);
    if (challengeIndex !== -1) {
      challengesData.days[challengeIndex].status = status;

      const storedData = JSON.parse(localStorage.getItem("challengesStatus") || "{}");
      storedData[id] = { ...storedData[id], status }; 
      localStorage.setItem("challengesStatus", JSON.stringify(storedData));

      setTimeout(() => resolve(challengesData.days[challengeIndex]), 300);
    } else {
      resolve(undefined);
    }
  });
};



