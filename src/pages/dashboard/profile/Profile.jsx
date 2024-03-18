import AdminDashboard from "../AdminDashboard"
import { useState } from "react"
import Account from "./Account"
import GeneralSetting from "./GeneralSetting"
import Security from "./Security"
const Profile = () => {
  const [show, setShow] = useState(0)
  return (
    <>
      <AdminDashboard />
      <div className="pl-72 pt-32 bg-gray-200">
        <h1 className="text-3xl font-bold">Profile & Setting</h1>

        <div className="m-14 shadow-lg p-3 bg-white">
          <div className=" flex">
            <button className={show === 0 ? "border-b-4 border-[#16a085] text-xl px-6 py-2 font-semibold " : "text-xl px-6 py-2 font-semibold "} onClick={() => setShow(0)}>Account</button>
            <button className={show === 1 ? "border-b-4 border-[#16a085] text-xl px-6 py-2 font-semibold " : " text-xl px-6 py-2 font-semibold "} onClick={() => setShow(1)}>General Settings</button>
            <button className={show === 2 ? "border-b-4 border-[#16a085] text-xl px-6 py-2 font-semibold " : " text-xl px-6 py-2 font-semibold "} onClick={() => setShow(2)}>Security</button>
          </div>

          {show === 0 ? <Account /> : null}
          {/* {show === 1 ? <GeneralSetting /> : null} */}
          {/* {show === 2 ? <Security /> : null} */}


        </div>
      </div>

    </>
  )
}

export default Profile