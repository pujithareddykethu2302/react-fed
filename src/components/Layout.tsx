// Layout.tsx
import { Outlet } from "react-router-dom";
import LeftsideSideMenuBar from "./Fed/MenuBarSide/LeftsideSideMenuBar";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Layout = () => {
  const [CloseMenu, setcloseMenu] = useState(false);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {!CloseMenu && (
        <div className="hidden sm:flex w-[15%] h-full">
          <LeftsideSideMenuBar
            setcloseMenu={setcloseMenu}
            CloseMenu={CloseMenu}
          />
        </div>
      )}

      {!CloseMenu && (
        <div className="fixed top-0 left-0 w-64 h-full z-40 sm:hidden shadow-lg">
          <LeftsideSideMenuBar
            setcloseMenu={setcloseMenu}
            CloseMenu={CloseMenu}
          />
        </div>
      )}

    
        <button
          className="absolute top-4 right-4 z-50 sm:right-4 sm:top-4 cursor-pointer border border-[#563A9C] rounded-[4px] h-[40px] w-[40px] flex justify-center items-center bg-[#563A9C]"
          onClick={() => setcloseMenu(!CloseMenu)}
        >
          <MenuIcon sx={{ color: "white" }} />
        </button>
      

      <div className=" w-[85%] flex-1  overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
