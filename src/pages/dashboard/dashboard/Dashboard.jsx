import AdminDashboard from "../AdminDashboard"
import { HiOutlineDocumentText } from 'react-icons/hi'
import { BsGraphUpArrow, BsBagCheck } from 'react-icons/bs'
import { PiUsersThreeLight } from 'react-icons/pi'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


import { useEffect, useState } from "react";
import { errorMessage } from "../../../utils/notificationManager";
import { axiosInstance } from "../../../utils/axiosSetup";



const Dashboard = () => {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);
    return date.toISOString().split('T')[0];
  });

  const [userList, setUserList] = useState([])
  const [pollList, setPollList] = useState([])
  const [userBarData, setUserBarData] = useState()

  const [userData, setUserData] = useState({
    labels: dates,
    datasets: [
      {
        label: "Polls",
        data: [25, 50, 75, 100, 25, 43, 19],
        backgroundColor: [
          "#16a085"
        ],
        borderColor: "black",
        borderWidth: 1,

      },
    ],
  });

  // ----------------------------------------------------- GET REQUEST FROM USER API START ----------------------------------------------------
  const getUser = async () => {
    try {
      
      const response = await axiosInstance.get("/user/")
      const data = await response?.data
      const users = data?.user
      setUserList([...users]?.reverse());
    } catch (error) {
      errorMessage(error?.response?.data?.message)
    }
  }
  
  // ----------------------------------------------------- GET REQUEST FROM USER API END ----------------------------------------------------

  // ----------------------------------------------------- GET REQUEST FROM USER API START ----------------------------------------------------
  const getPolls = async () => {
    try {
      
      const response = await axiosInstance.get("/poll/allPolls")
      const data = await response?.data
      const polls = data?.polls
      setPollList([...polls]?.reverse());
    } catch (error) {
      errorMessage(error?.response?.data?.message)
    }
  }
  
  // ----------------------------------------------------- GET REQUEST FROM USER API END ----------------------------------------------------

  const monthlyCountsMap = userList.reduce((acc, user) => {
    const month = new Date(user.createdAt).getMonth(); // Assuming createdAt contains date
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Convert object to array of { month: count } objects
  const monthlyCountsArray = Object.entries(monthlyCountsMap).map(([month, count]) => ({
    month: parseInt(month),
    count
  }));

  console.log(monthlyCountsArray);
  useEffect(() => {
    getUser()
    getPolls()
  }, [])

 
  return (
    <>
      <AdminDashboard />
      <div className="pl-72 pt-32 bg-gray-200">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="mt-10">

          <div className="flex pb-10">

            <div className="bg-white p-5 w-[23%] h-auto mr-6 rounded-lg">
              <PiUsersThreeLight className="text-2xl  m-2" />
              <p className=" m-2"> Total Users</p>
              <h1 className="text-3xl font-bold m-2">{userList?.length}</h1>
            </div>
            <div className="bg-white p-5 w-[23%] h-auto mr-6 rounded-lg">
              <PiUsersThreeLight className="text-2xl  m-2" />
              <p className=" m-2"> Monthly Users</p>
              <h1 className="text-3xl font-bold m-2">1345</h1>
            </div>
            <div className="bg-white p-5 w-[23%] h-auto mr-6 rounded-lg">
              <BsGraphUpArrow className="text-2xl  m-2" />
              <p className=" m-2"> Total Polls</p>
              <h1 className="text-3xl font-bold m-2">{pollList?.length}</h1>
            </div>
            <div className="bg-white p-5 w-[23%] h-auto mr-6 rounded-lg">
              <BsGraphUpArrow className="text-2xl  m-2" />
              <p className=" m-2"> Monthly Polls</p>
              <h1 className="text-3xl font-bold m-2">345</h1>
            </div>

          </div>

          <div className="flex pb-10 ">
            <div className="w-[70%] bg-white p-10">
              <h1 className="text-xl">Past Week Polls</h1>
              <Bar

                data={userData} />
            </div>

            <div className="w-[24%] ml-12 rounded-lg bg-white p-5">
              <h1 className="text-xl font-semibold">Active Users</h1>

              {
                userList?.slice(1, 10)?.map((user) => {
                  return (
                    <div className="mt-2 flex" key={user?._id}>
                    <img src="https://img.freepik.com/free-photo/indoor-shot-attractive-young-woman-with-glasses-posing-against-white-wall_273609-20347.jpg?w=1060&t=st=1694505251~exp=1694505851~hmac=47d7701cbee598028524f78fb4d5e7648c1cc1c516ce4bcbb6e077e97d1517bc" alt="" className="w-10 h-10 object-cover rounded-full mt-1" />
                    <div className="ml-3">
                      <p className="font-bold">{user?.name}</p>
                      <p className="text-sm">Anablack@gmail.com</p>
                    </div>
                  </div>
                  )
                })
              }


            </div>
          </div>
          <div className="flex pb-10 ">

          </div>


        </div>



      </div>
    </>
  )
}

export default Dashboard