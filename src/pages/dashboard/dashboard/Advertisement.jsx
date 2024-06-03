import { Box, Modal, TablePagination } from "@mui/material"
import AdminDashboard from "../AdminDashboard"
import { BsSearch } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosSetup";
import { errorMessage, successMessage } from "../../../utils/notificationManager";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import dayjs from "dayjs";

// console.log(dayjs().add(7, "days").format("DD/MM/YYYY"));

const Advertisement = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [media, setMedia] = useState(null)
    const [openEdit, setOpenEdit] = useState(false);
    const [userId, setUserId] = useState()
    const [caption, setCaption] = useState()
    const [location, setLocation] = useState()
    const [expiryDate, setExpiryDate] = useState()
    const [_id, setId] = useState()
    const [users, setUsers] = useState([])
    const [duration, setDuration] = useState("")




    const [advertisementList, setAdvertisementList] = useState([])
    const [inputs, setInputs] = useState({
        userId: "",
        caption: "",
        location: "",
        expiryDate: ""
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        e.preventDefault()

        if (e.target.name === "media") {
            setMedia(e.target.files[0])
        }


        setInputs({ ...inputs, [e.target.name]: e.target.value })


    }

    console.log(media);


    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "45%",
        height: "auto",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false)
        // clearAll()
    }

    const handleDurationChange = (e) => {
        const value = e.target.value;
        setDuration(value);
        const newExpiryDate = calculateExpiryDate(value);
        setInputs({ ...inputs, expiryDate: newExpiryDate });
        setExpiryDate(newExpiryDate)
    };

    const handleEdit = (_id, userId, caption, location, expiryDate) => {

        setOpenEdit(true)

        setId(_id)
        setUserId(userId)
        setCaption(caption)
        setLocation(location)
        setExpiryDate(expiryDate)

    }

    const calculateExpiryDate = (duration) => {
        let newDate;
        switch (duration) {
            case '7 days':
                newDate = dayjs().add(7, 'days').format('YYYY-MM-DD');
                break;
            case '1 month':
                newDate = dayjs().add(1, 'months').format('YYYY-MM-DD');
                break;
            default:
                newDate = dayjs().format('YYYY-MM-DD');
        }
        return newDate;
    };

  

    const createad = async () => {
        // if (!name) {
        //     errorMessage('Enter Proper Name 😓')
        //     return
        // }
        // if (!email) {
        //     errorMessage('Enter Proper Email 😓')
        //     return
        // }
        // if (!phone || phone.length !== 10) {
        //     errorMessage('Enter Proper Phone 😓')
        //     return
        // }
        // if (!password || password.length < 6) {
        //     errorMessage('Your Password is too small 😓')
        //     return
        // }
        // if (!gender) {
        //     errorMessage('Select Gender 😓')
        //     return
        // }

        const fD = new FormData()
        fD.append("userId", inputs?.userId)
        fD.append("media", media)
        fD.append("caption", inputs?.caption)
        fD.append("location", inputs?.location)
        fD.append("expiryDate", inputs?.expiryDate)

        setLoader(true)
        try {
            // const payload = {
            //     name,
            //     email,
            //     phone,
            //     password,
            //     confirmPassword: password,
            //     gender,
            //     team,
            //     role,
            // }
            const res = await axiosInstance.post('/ads/create', fD);
            if (res.data.success) {
                successMessage(`New User ${res?.data?.user.name} is Created Successfully 🎉🎉`)
            } else {
                errorMessage('Something Went Wrong While Creating Users !! 😓')
            }
            //   setLoader(false)
            //   getUsers()
            //   clearAll()
            //   handleClose()
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            setLoader(false)

        }
    }


    const getUsers = async () => {
        try {
            //   clearAll()
            setLoader(true)
            const res = await axiosInstance.get('/user');
            if (res.data.success) {
                setUsers(res.data.user)
            } else {
                errorMessage('Something Went Wrong While Fetching Users !! 😓')
            }
            setLoader(false)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            setLoader(false)

        }
    }



    const fetchAdvertisement = async () => {
        try {
            const response = await axiosInstance.get("/ads/")
            const data = await response?.data
            setAdvertisementList(data?.ads);

        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    const handleDelete = async (_id) => {
        try {
            const response = await axiosInstance.delete(`/ads/delete?id=${_id}`)
            const data = await response?.data
            // setAdvertisementList(data?.ads);
            successMessage(data?.message)

        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    const updateUsers = async () => {
        // if (!name) {
        //   errorMessage('Enter Proper Name 😓')
        //   return
        // }

        // if (!phone || phone.length !== 10) {
        //   errorMessage('Enter Proper Phone 😓')
        //   return
        // }

        const fD = new FormData()
        fD.append("userId", userId)
        fD.append("media", media)
        fD.append("caption", caption)
        fD.append("location", location)
        fD.append("expiryDate", expiryDate)


        setLoader(true)
        try {
            //   const payload = {
            //     name,
            //     email,
            //     phone,
            //     // password,
            //     gender,
            //     team,
            //     role,
            //   }
            const res = await axiosInstance.patch(`/ads/update?id=${_id}`, fD);
            if (res.data.success) {
                successMessage(`${res?.data?.user.name} Updated Successfully 🎉🎉`)
            } else {
                errorMessage('Something Went Wrong While Updating User !! 😓')
            }
            setLoader(false)
            //   getUsers()
            //   clearAll()
            //   handleCloseEdit()
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            setLoader(false)
        }
    }


    useEffect(() => {
        fetchAdvertisement()
        getUsers()
    }, [])
    return (
        <div>
            <AdminDashboard />

            <div className="pl-20 pt-12 bg-gray-200 md:pl-72 md:pt-32">

                <h1>Advertisement</h1>

                <div className="mt-10 mb-5 mr-10">
                    <div className="text-lg">Advertisement List</div>

                    <div className="float-right flex bg-[#16a085] text-white px-10 py-2 -mt-10 cursor-pointer" onClick={handleOpen}>
                        <RiAddFill className="m-1 " />
                        <button className="w-full text-center" >Add New Advertisement</button>
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
                                                {/* <BiFilter /> */}
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Advertisement
                                                {/* <BiFilter /> */}
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Media
                                                {/* <BiFilter /> */}
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Caption
                                                {/* <BiFilter /> */}
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                location
                                                {/* <BiFilter /> */}

                                            </div>
                                        </th>

                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center capitalize">
                                                expiry date
                                                {/* <BiFilter /> */}

                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center capitalize">
                                                Action
                                                {/* <BiFilter /> */}

                                            </div>
                                        </th>


                                    </tr>
                                </thead>


                                <tbody >

                                    {
                                        advertisementList?.map((action, index) => {
                                            return (
                                                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={index}>
                                                    <td className="border-r">
                                                        <input type="checkbox" />
                                                    </td>
                                                    {/* <td className="p-2 border-r flex items-center justify-center">
                                                <img src="" alt="" className="w-10" />
                                            </td> */}
                                                    <td className="p-2 border-r">{action?.userId?.name}</td>
                                                    <td className="p-2 border-r">{action?.likeCount}</td>

                                                    <td className="p-2 border-r">
                                                        <img src={action?.media} alt={action?._id} className="w-40 rounded-lg h-32 object-cover object-center"/>
                                                    </td>
                                                    <td className="p-2 border-r">{action?.caption}</td>
                                                    <td className="p-2 border-r">{action?.location}</td>
                                                    <td className="p-2 border-r">{action?.expiryDate?.split("T")[0]}</td>
                                                    <td className="flex justify-center text-2xl pt-1 ">
                                                        <AiOutlineEdit className="mx-4 text-green-700 cursor-pointer" onClick={() => handleEdit(action?._id, action?.userId?._id, action?.caption, action?.location, action?.expiryDate)} />
                                                        <AiOutlineDelete className="mx-4 text-red-800 cursor-pointer" onClick={() => handleDelete(action?._id)} />
                                                        {/* <MdDisabledVisible className="mx-4 text-orange-400 cursor-pointer" onClick={() => handleOpenDelete(i?.id, i?.name)} /> */}
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

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <div className="mt-1">
                            <h1 className="text-black text-2xl font-bold text-center">Add Advertisement </h1>

                            <div className="flex items-center justify-center py-5 ">

                                <form action="" className="lg:flex ">
                                    <div className="w-full grid grid-cols-2 gap-5">
                                        <div className="mb-2">
                                            <label className=" block text-base font-medium  text-[#07074D]">
                                                User
                                            </label>
                                            <select name="userId" id="userId" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={expiryDate} onChange={handleChange}>
                                                <option value="" disabled> Select </option>
                                                {
                                                    users?.map((user) => {
                                                        return (
                                                            <option key={user?._id} value={user?._id}>{user?.name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="lName" className=" block text-base font-medium  text-[#07074D]">
                                                Media
                                            </label>
                                            <input type="file" name="media" id="media" placeholder="Email" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={handleChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="Phone" className=" block text-base font-medium  text-[#07074D]">
                                                Caption
                                            </label>
                                            <input type="text" name="caption" id="Phone" placeholder="Caption" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={inputs?.caption} onChange={handleChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="" className=" block text-base font-medium  text-[#07074D]">
                                                Location
                                            </label>
                                            <input type="text" name="location" id="lName" placeholder="location" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={inputs?.location} onChange={handleChange} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-1">Duration:</label>
                                            <select name="duration" value={duration} onChange={handleDurationChange} className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                                <option value="">Select Duration</option>
                                                <option value="7 days">7 Days</option>
                                                <option value="1 month">1 Month</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-1">Expiry Date:</label>
                                            <input type="date" name="expiryDate" value={inputs.expiryDate} onChange={handleChange} className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md disabled:cursor-not-allowed" disabled />
                                        </div>

                                    </div>
                                    {/* <div className="w-full lg:ml-20">

                                        <div className="mb-2">
                                            <label htmlFor="gender" className=" block text-base font-medium  text-[#07074D]">
                                                Expiry Date
                                            </label>
                                            <select name="expiryDate" id="gender" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={""}>
                                                <option value="" disabled> Select </option>
                                                <option value="male"> Male</option>
                                                <option value="female">Female</option>
                                                <option value="others">Others</option>
                                            </select>

                                        </div>


                                    </div> */}
                                </form>

                            </div>


                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleClose} className="mx-2 border-2 text-[#16a085] border-[#16a085] rounded-lg px-12 py-2 "> Cancel </button>
                            <button className="mx-2 border-2 bg-[#16a085] rounded-lg text-white px-12 py-2 " onClick={() => createad()}>Add  </button>
                        </div>


                    </Box>
                </Modal >

                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <div className="mt-1">
                            <h1 className="text-black text-2xl font-bold">Edit User</h1>

                            <div className="flex items-center justify-center py-5 ">

                                <form action="" className="lg:flex ">
                                <div className="w-full grid grid-cols-2 gap-5">

                                        <div className="mb-2">
                                            <label className=" block text-base font-medium  text-[#07074D]">
                                                User
                                            </label>
                                            <select name="userId" id="userId" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={userId} onChange={(e) => setUserId(e.target.value)}>
                                                <option value="" disabled> Select </option>
                                                {
                                                    users?.map((user) => {
                                                        return (
                                                            <option key={user?._id} value={user?._id}>{user?.name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>


                                        <div className="mb-2">
                                            <label htmlFor="lName" className=" block text-base font-medium  text-[#07074D]">
                                                Media
                                            </label>
                                            <input type="file" name="media" id="media" placeholder="Email" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={handleChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="Phone" className=" block text-base font-medium  text-[#07074D]">
                                                Caption
                                            </label>
                                            <input type="text" name="caption" id="caption" placeholder="Caption" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={caption} onChange={(e) => setCaption(e.target.value)} />
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="Password" className=" block text-base font-medium  text-[#07074D]">
                                                Location
                                            </label>
                                            <input type="text" name="location" id="location" placeholder="Password" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={location} onChange={(e) => setLocation(e.target.value)} />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-1">Duration:</label>
                                            <select name="duration" value={duration} onChange={handleDurationChange} className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " >
                                                <option value="">Select Duration</option>
                                                <option value="7 days">7 Days</option>
                                                <option value="1 month">1 Month</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-1">Expiry Date:</label>
                                            <input type="date" name="expiryDate" value={expiryDate?.split("T")[0]} onChange={handleChange} className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md disabled:cursor-not-allowed"  disabled />
                                        </div>

                                    </div>
                                    {/* <div className="w-full lg:ml-20">


                                        <div className="mb-2">
                                            <label htmlFor="status" className=" block text-base font-medium  text-[#07074D]">
                                                Status
                                            </label>
                                            <select name="Gender" id="gender" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}>
                                                <option value="" disabled> Select </option>
                                                <option value="male"> Completed</option>
                                                <option value="female">InComplete</option>
                                                <option value="others">Pending</option>
                                            </select>

                                        </div>




                                    </div> */}
                                </form>

                            </div>


                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleCloseEdit} className="mx-2 border-2 text-[#16a085] border-[#16a085] rounded-lg px-12 py-2 "> Cancel </button>
                            <button className="mx-2 border-2 bg-[#16a085] rounded-lg text-white px-12 py-2 " onClick={() => updateUsers()}>Update  User </button>
                        </div>


                    </Box>
                </Modal >





            </div>
        </div>
    )
}

export default Advertisement