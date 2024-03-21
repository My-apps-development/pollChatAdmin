import { RiAddFill } from "react-icons/ri"
import AdminDashboard from "../AdminDashboard"
import { TablePagination } from "@mui/material"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { BiFilter } from "react-icons/bi"
import { FaRegCalendarAlt } from "react-icons/fa"
import { FiFilter } from "react-icons/fi"
import { BsSearch } from "react-icons/bs"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { errorMessage } from "../../../utils/notificationManager"
import { axiosInstance } from "../../../utils/axiosSetup"


const Actions = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [actionList, setActionList] = useState([])

    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0];
    });

    const [userData, setUserData] = useState({
        labels: dates,
        datasets: [
            {
                label: "Actions",
                data: [25, 50, 75, 100, 25, 43, 19],
                backgroundColor: [
                    "#16a085"
                ],
                borderColor: "black",
                borderWidth: 1,

            },
        ],
    });


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchActions = async () => {
        try {
            const response = await axiosInstance.get("/action/")
            const data = await response?.data
            setActionList(data?.actions);
        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchActions()
    }, [])

    // console.log(actionList);
    return (
        <div>
            <AdminDashboard />
            <div className="pl-20 pt-12 bg-gray-200 md:pl-72 md:pt-32">
                <h1 className="text-3xl font-bold">Actions</h1>
                <div className="mt-10 mb-5 mr-10">
                    <div className="text-lg">Action List</div>
                    <div className="float-right flex bg-[#16a085] text-white px-10 py-2 -mt-10 cursor-pointer">
                        <RiAddFill className="m-1 " />
                        <button className="" >Add a New User</button>
                    </div>
                </div>

                <div className="bg-white">
                    <div className="flex justify-center pt-5">
                        <div className="flex border-2 border-gray-300 rounded-lg px-2">
                            <BsSearch className="mt-1" />
                            <input placeholder="Search" className="px-2  h-6 w-auto rounded-lg focus:outline-none" name="text" type="text" />
                        </div>


                        <div className="flex px-2 border-2 border-gray-300 rounded-lg ml-3 cursor-pointer">
                            <FiFilter className="mt-1 mr-3" /> Filter
                        </div>
                        <div className="flex px-2 border-2 border-gray-300 rounded-lg ml-3 cursor-pointer">
                            <FaRegCalendarAlt className="mt-1 mr-3" /> Filter
                        </div>
                    </div>
                    {/* //?Table  */}
                    <div className="mr-1">
                        <div className="table w-full p-2">
                            <table className="w-full border">
                                <thead>
                                    <tr className=" border-b">
                                        <th className="border-r">
                                            <input type="checkbox" />
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                User
                                                <BiFilter />
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Actions
                                                <BiFilter />
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Like
                                                <BiFilter />
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Dislike
                                                <BiFilter />
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Comment
                                                <BiFilter />

                                            </div>
                                        </th>

                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Share
                                                <BiFilter />

                                            </div>
                                        </th>

                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Action
                                                <BiFilter />

                                            </div>
                                        </th>
                                    </tr>
                                </thead>


                                <tbody >

                                    {
                                        actionList?.map((action, index) => {
                                            return (
                                                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>
                                                    <td className="border-r">
                                                        <input type="checkbox" />
                                                    </td>
                                                    {/* <td className="p-2 border-r flex items-center justify-center">
                                                <img src="" alt="" className="w-10" />
                                            </td> */}
                                                    <td className="p-2 border-r">{action?.userId?.name}</td>
                                                    <td className="p-2 border-r">
                                                        <div className="w-auto h-auto flex justify-center items-center ">
                                                            <video className="w-44 h-72" controls>
                                                                <source src={action?.action} type="video/mp4" />
                                                            </video>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 border-r">{action?.likeCount}</td>
                                                    <td className="p-2 border-r">{action?.dislikeCount}</td>
                                                    <td className="p-2 border-r">{action?.commentCount}</td>
                                                    <td className="p-2 border-r">{action?.shareCount}</td>
                                                    {/* <td className="p-2 border-r cursor-pointer" title={action?.action}>action link</td> */}

                                                    {/* 
                            {action === "In-Progress" ? <td className="p-2 border-r text-blue-500 bg-blue-100">{action}</td> : null}
                            {action === "Pending" ? <td className="p-2 border-r text-gray-500 bg-gray-100">{action}</td> : null}
                            {action === "Completed" ? <td className="p-2 border-r text-green-500 bg-green-100">{action}</td> : null} */}

                                                    <td className="flex justify-center text-2xl pt-1 ">
                                                        <AiOutlineEdit className="mx-4 text-green-700 cursor-pointer" />
                                                        <AiOutlineDelete className="mx-4 text-red-800 cursor-pointer" />

                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }
                                </tbody>


                            </table>
                            <table>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td><TablePagination
                                            rowsPerPageOptions={[5, 10, 100]}
                                            component="div"
                                            count={1}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        /></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="w-[70%] bg-white p-10">
                        <h1 className="text-xl">Past Week Actions</h1>
                        <Bar

                            data={userData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actions