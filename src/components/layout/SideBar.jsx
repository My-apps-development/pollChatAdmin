import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { TbReportSearch, TbLogout2 } from "react-icons/tb";
import { MdOutlinePoll } from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiFilmReel } from "react-icons/pi";
import { LuMusic } from "react-icons/lu";
import { PiStickerDuotone } from "react-icons/pi";
import { RiAdvertisementLine } from "react-icons/ri";

const SideBar = () => {
  const location = useLocation()
  const navigate=useNavigate()
  


  const logout = () => {
    localStorage.clear();
    navigate("/login")
}
  return (
    <div >
      <div className="fixed flex flex-col  left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-black transition-all duration-300 border-none z-10 sidebar mt-20 shadow-lg ">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
              {/* <div className="flex flex-row items-center h-8">
                <div className="text-lg font-bold tracking-wide text-black-400 ">
                  Super Admin

                </div>
              </div> */}
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <RiDashboardLine />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <TbReportSearch />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Reports
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/polls"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <MdOutlinePoll />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Polls
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiUsers />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Users
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/moments"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <BsCameraReels />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Moments
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/actions"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <PiFilmReel />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Actions
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/musics"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <LuMusic />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Music
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ads"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <RiAdvertisementLine />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Advertisement
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/stickers"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <PiStickerDuotone />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Stickers
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/chat"
                className={({ isActive, isPending }) =>
                  isPending ? "flex flex-row items-center duration-300 hover:shadow-xl hover:scale-105   pr-6" : isActive ? "flex flex-row items-center duration-300 scale-105 pr-6 bg-[#16a085] text-white shadow-xl" : ""
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <IoChatboxEllipsesOutline  />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Chat
                </span>
              </NavLink>
            </li>
            
            <li>
              <div
                className="flex flex-row items-center duration-300 pr-6 mt-10 cursor-pointer"
                onClick={()=>logout()}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <TbLogout2 />
                </span>
                <span className="ml-2 text-lg tracking-wide truncate">
                  Log Out
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar