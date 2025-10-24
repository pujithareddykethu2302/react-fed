import { useNavigate } from "react-router-dom";
import bannerImage from "../../../assets/Images/AboutUs/Website Creator-cuate.svg";
import whoWeAre from "../../../assets/Images/AboutUs/whoweAre.svg";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative w-full h-[600px]">
        <img
          src={bannerImage}
          className="w-full h-full object-cover"
          alt="Banner"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/65 to-black/60 z-0"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 text-center z-10">
          <p className="text-4xl font-bold text-white drop-shadow-lg">
            Master React, One Challenge at a Time — Build with Challenges
          </p>
          <p className="mt-4 text-lg text-white drop-shadow-md">
            A hands-on playground for front-end devs
          </p>
          <button
            className="mt-6 px-6 py-3 bg-[#563A9C] text-white rounded hover:bg-[#472F85] cursor-pointer"
            onClick={() => navigate("/30-days-challenge")}
          >
            Start Your First Challenge
          </button>
        </div>
      </div>
      <div className="mt-[2rem] flex justify-center items-center mx-[5rem] w-[80%]">
        <img src={whoWeAre} className="w-100 h-100" />
        <div className="px-6">
          {/* Heading */}
          <p className="text-3xl font-bold text-black">
            Where <span className="text-[#563A9C]">Developers</span> Build
            Confidence
          </p>

          {/* Content with vertical line */}
          <div className="flex items-start mt-6">
            <div className="w-1 h-25 bg-[#B0B0B0] rounded mr-4"></div>
            <p className="text-gray-500 leading-relaxed">
              Challenge Hub is a hands-on platform for front-end developers to
              learn by doing. With practical challenges, real-world projects,
              and daily progress, it helps you master React and modern web
              development step by step—whether you’re a beginner or sharpening
              your skills.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Our Mission</p>
          <p>
            Our mission is simple: turn learning into building. We aim to
            provide developers with structured, bite-sized daily challenges that
            teach core React concepts and front-end development skills. Instead
            of endless theory, we focus on practical exercises that you can
            complete in 20–40 minutes a day, helping you grow steadily and
            confidently.
          </p>
        </div>
        <div>
          <p>our vision</p>
          <p>
            We envision a world where developers learn by building, not just
            reading. Challenge Hub encourages daily practice, small wins, and
            consistent growth. By completing each challenge, learners gain
            confidence, improve coding skills, and build a foundation for
            real-world front-end projects.
          </p>
        </div>
      </div>
      <div>
        <p>What You’ll Find Here</p>
        <p>Daily React Challenges</p>
        <p>Set goals</p>
        <p>Tracker</p>
        <p>Add your resources</p>
        <p>add your custom challenges</p>
      </div>
      <div>
        <p>Small Steps. Big Progress.</p>
      </div>
    </div>
  );
};

export default AboutUs;
