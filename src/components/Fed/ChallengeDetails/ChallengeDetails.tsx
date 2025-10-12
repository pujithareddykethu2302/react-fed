import { useLocation, useNavigate } from "react-router-dom";

const ChallengeDetails = () => {
    const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);

  return (
    <div>
      <p>{state.dayChallenge}</p>
      <p>{state.title}</p>
      <p>{state.topic}</p>
      <p>{state.longDescription}</p>
      <img src={state.icon} className="w-5 h-5"/>
      <p>{state.difficulty}</p>
      <button onClick={()=>navigate('/30-days-challenge')}> Back </button>
      <button onClick={()=> window.open("https://codesandbox.io/", "_blank")}> Start </button>
    </div>
  );
};

export default ChallengeDetails;
