// Layout.tsx
import { Outlet } from "react-router-dom";
import LeftsideSideMenuBar from "./Fed/MenuBarSide/LeftsideSideMenuBar";


const Layout = () => {
        
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="w-[15%] h-full">
                <LeftsideSideMenuBar />
            </div>

            <div className=" w-[85%] flex-1 p-4 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
