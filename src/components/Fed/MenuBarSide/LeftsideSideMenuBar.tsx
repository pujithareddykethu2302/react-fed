import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import InfoIcon from "@mui/icons-material/Info";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";


interface LeftsideSideMenuBar {
    CloseMenu : boolean;
    setcloseMenu: any
}

const LeftsideSideMenuBar = ({CloseMenu, setcloseMenu}:LeftsideSideMenuBar) => {

  const SideMenuData = [
    {
      title: "DashBoard",
      icon: <DashboardIcon sx={{ color: "white" }} fontSize="small" />,
      path: "/",
    },
    {
      title: "Custom Challenge",
      icon: (
        <WbIncandescentOutlinedIcon sx={{ color: "white" }} fontSize="small" />
      ),
      path: "/custom-challeneg",
    },
    {
      title: "My Planner",
      icon: <ChecklistIcon sx={{ color: "white" }} fontSize="small" />,
      path: "/my-planner",
    },
    {
      title: "Challenge Hub",
      icon: <MilitaryTechIcon sx={{ color: "white" }} fontSize="small" />,
      path: "/30-days-challenge",
    },
    {
      title: "Contact Us",
      icon: <ContactPageIcon sx={{ color: "white" }} fontSize="small" />,
      path: "/contact-us",
    },
    {
      title: "About Us",
      icon: <InfoIcon sx={{ color: "white" }} fontSize="small" />,
      path: "/about-us",
    },
    {
      title: "Resources",
      icon: (
        <LibraryBooksOutlinedIcon sx={{ color: "white" }} fontSize="small" />
      ),
      path: '/reources-page',
    },
  ];
  return (
    <>
      <div className="bg-[#563A9C] flex  flex-col px-[15px] py-[15px] h-full sm-z-20">
        <div className="flex flex-row justify-between items-center w-full py-[10px] h-[13vh]">
          <div className="flex justify-center items-center">
            <p className="text-[24px] font-[700] leading-[24px] text-[#ffffff]">
              {" "}
              FED !
            </p>
          </div>
          <div className="flex">
            <button
              className="cursor-pointer border border-white rounded-[4px] h-[40px] w-[40px] flex justify-center items-center"
              onClick={() => {
                setcloseMenu(!CloseMenu);
              }}
            >
              <MenuOpenIcon sx={{ color: "white" }} />
            </button>
          </div>
        </div>

        <div>
          {SideMenuData.map((items: any, key) => {
            return (
              <div
                className="flex my-[30px]"
                key={key}
                onClick={() => {
                  window.location.pathname = items.path;
                }}
              >
                <p className="w-[20%]">{items.icon}</p>
                <p className="text-white text-[16px] font-[400]">
                  {items.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex-grow"></div>
        <div>
          <p className="text-[12px] text-white/70">
            {" "}
            Master React in 30 days with focused daily challenges. Build real
            projects, strengthen your skills, and grow with confidence.
          </p>
        </div>
        <div className="my-[20px]">
          <FacebookRoundedIcon
            sx={{ color: "white" }}
            fontSize="small"
            className="mr-[10px]"
          />
          <WhatsAppIcon
            sx={{ color: "white" }}
            fontSize="small"
            className="mr-[10px]"
          />
          <InstagramIcon
            sx={{ color: "white" }}
            fontSize="small"
            className="mr-[10px]"
          />
          <LinkedInIcon
            sx={{ color: "white" }}
            fontSize="small"
            className="mr-[10px]"
          />
          <GitHubIcon
            sx={{ color: "white" }}
            fontSize="small"
            className="mr-[10px]"
          />
        </div>
      </div>
    </>
  );
};

export default LeftsideSideMenuBar;
