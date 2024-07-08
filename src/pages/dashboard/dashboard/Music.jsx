import { Box, Modal, TablePagination } from "@mui/material"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { BiFilter } from "react-icons/bi"
import { BsSearch } from "react-icons/bs"
import { FaRegCalendarAlt } from "react-icons/fa"
import { RiAddFill } from "react-icons/ri"
import AdminDashboard from "../AdminDashboard"
import Loader from "../../../components/Loader"
import { errorMessage, successMessage } from "../../../utils/notificationManager"
import { axiosInstance } from "../../../utils/axiosSetup"
import { useEffect, useState } from "react"


const Music = () => {
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [bulkModalOpen, setBulkModalOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [inputs, setInputs] = useState({
        singerName: "",
        musicName: ""
    })

    //?Users-----------------------------
    const [music, setMusic] = useState()
    const [postMusic, setPostMusic] = useState()
    const [musicFiles, setMusicFiles] = useState([])

    const [userId, setUserId] = useState()
    const [singerName, setSingerName] = useState()
    // const [music, setMusic] = useState()
    // const [musicName, setMusicName] = useState()


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

    //?Modal2------------------------------------
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = (id, name) => {
        setUserId(id)
        setSingerName(name)
        // setEmail(email)
        // setTeam(team)
        // setRole(role)
        // setGender(gender)
        // setPhone(phone)
        // setPassword("")

        setOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setOpenEdit(false)
        clearAll()
    }

    //?Modal3------------------------------------
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = (id, name) => {
        setUserId(id)
        setSingerName(name)

        setOpenDelete(true)

    }
    const handleCloseDelete = () => setOpenDelete(false);

    // const [action, setAction] = useState("Completed")
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // ---------------------------------------------- Table Pagination Start ---------------------------------------------------------


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // ---------------------------------------------- Table Pagination Ends ---------------------------------------------------------



    //  -----------------------------------------  Setting Inputs Starts    ------------------------------------------------------

    const handleChange = (e) => {
        e.preventDefault()

        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }


    const handleChangeFile = (e) => {
        e.preventDefault()

        const file = e.target.files[0]

        setPostMusic(file)


    }

    const handleUploadBulkFiles = (e) => {
        e.preventDefault()

        const files = e.target.files

        setMusicFiles([...musicFiles, ...files])
    }


    //  -----------------------------------------  Setting Inputs Ends    ------------------------------------------------------




    const clearAll = () => {
        // setTeam("")
        // setRole("")
        // setGender("")
        // setPassword("")
        // setPhone("")
        // setEmail("")
        setSingerName("")
        setUserId("")
    }

    // ---------------------------------------------- Music Crud Operation Starts ---------------------------------------------------------


    const createUsers = async () => {

        const formData = new FormData()
        formData.append("musicName", inputs?.musicName)
        formData.append("singer", inputs?.singerName)
        formData.append("music", postMusic)

        if (!inputs?.singerName) {
            errorMessage('Enter Proper Singer Name 😓')
            return
        }
        if (!inputs?.musicName) {
            errorMessage('Enter Proper Music Name 😓')
            return
        }
        if (!postMusic) {
            errorMessage('Music File Required 😓')
            return
        }

        try {
            setLoader(true)
            const res = await axiosInstance.post('/music/create', formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (res.data.status) {
                successMessage(`New Music ${res?.data?.message} is Created Successfully 🎉🎉`)
            } else {
                errorMessage('Something Went Wrong While Creating Music !! 😓')
            }
            setLoader(false)
            getMusics()
            clearInputs()
            handleClose()
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            setLoader(false)

        }
    }

    const bulkMusicUpload = async () => {

        if (!inputs?.singerName) {
            errorMessage('Enter Proper Singer Name 😓')
            return
        }
        if (!inputs?.musicName) {
            errorMessage('Enter Proper Music Name 😓')
            return
        }

        if (!musicFiles) {
            errorMessage('Music Files Required 😓')
            return
        }

        const formData = new FormData()
        formData.append("musicName", inputs?.musicName)
        formData.append("singer", inputs?.singerName)
        musicFiles.map((file, index) => {
            formData.append(`files${index}`, file);
        });

        try {
            setLoader(true)

            const res = await axiosInstance.post('/music/bulk', formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (res.data.status) {
                successMessage(`New  ${res?.data?.message} Music is Created  🎉🎉`)
                setMusicFiles([])
               
            } else {
                errorMessage('Something Went Wrong While Creating Bulk Music Upload !! 😓')
            }
            setLoader(false)
            getMusics()
            clearInputs()
            setBulkModalOpen(false)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            setLoader(false)

        }
    }

    const getMusics = async () => {
        try {
            clearAll()
            setLoader(true)
            const res = await axiosInstance.get('/music/allmusic');
            if (res.data.status == true) {
                setMusic(res.data.musics)
            } else {
                errorMessage('Something Went Wrong While Fetching Users !! 😓')
            }
            setLoader(false)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            setLoader(false)

        }
    }

    const updateUsers = async () => {
        if (!name) {
            errorMessage('Enter Proper Name 😓')
            return
        }

        // if (!phone || phone.length !== 10) {
        //     errorMessage('Enter Proper Phone 😓')
        //     return
        // }


        setLoader(true)
        try {
            const payload = {
                name,
                // email,
                // phone,
                // // password,
                // gender,
                // team,
                // role,
            }
            const res = await axiosInstance.patch(`/user/edit/${userId}`, payload);
            if (res.data.success) {
                successMessage(`${res?.data?.user.name} Updated Successfully 🎉🎉`)
            } else {
                errorMessage('Something Went Wrong While Updating User !! 😓')
            }
            setLoader(false)
            getMusics()
            clearAll()
            handleCloseEdit()
        } catch (error) {
            errorMessage(error?.response?.data?.message)
            setLoader(false)
        }
    }


    const deleteUser = async () => {
        try {
            setLoader(true)
            const res = await axiosInstance.delete(`/user/delete/${userId}`);
            if (res.data.success) {
                successMessage(`${name} Deleted Successfully`)
                getMusics()
                handleCloseDelete()
            } else {
                errorMessage('Something Went Wrong While Deleting category !! 😓')
            }
            setLoader(false)
        } catch (error) {
            errorMessage(error.message)
            setLoader(false)
        }
    }


    // -------------------------------------- Music Crud Operation Ends ---------------------------------------------------------------



    const clearInputs = () => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            musicName: "",
            singerName: ""
        }))
    }

    useEffect(() => {
        getMusics()
    }, [])
    return (
        <>
            {loader ? <Loader /> : null}

            <AdminDashboard />
            <div className="pl-20 pt-12 bg-gray-200 md:pl-72 md:pt-32">
                <h1 className="text-3xl font-bold">Music</h1>
                <div className="mt-10 mb-5 p-3 mr-10 flex justify-between items-center">
                    <div className="text-lg">Music List</div>
                    <div className="flex gap-3">
                        <div className=" flex justify-center w-48 items-center gap-3 bg-[#16a085] text-white py-2 cursor-pointer" onClick={handleOpen}>
                            <RiAddFill className="" />
                            <button className="" >Add Music</button>
                        </div>
                        <div className="flex justify-center w-48 items-center gap-3 bg-[#16a085] text-white  py-2 cursor-pointer"
                            onClick={() => setBulkModalOpen(true)}
                        >
                            <RiAddFill className="" />
                            <button className="" >Add Bulk Music</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white">
                    <div className="flex justify-center pt-5">
                        <div className="flex border-2 border-gray-300 rounded-lg px-2">
                            <BsSearch className="mt-1" />
                            <input placeholder="Search" className="px-2  h-6 w-auto rounded-lg focus:outline-none" name="text" type="text" />
                        </div>

                        {/* 
            <div className="flex px-2 border-2 border-gray-300 rounded-lg ml-3 cursor-pointer">
              <FiFilter className="mt-1 mr-3" /> Filter
            </div> */}
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
                                                Music
                                                <BiFilter />
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Music Name
                                                <BiFilter />
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Singer Name
                                                <BiFilter />
                                            </div>
                                        </th>
                                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Uploader
                                                <BiFilter />
                                            </div>
                                        </th>


                                        {/* <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-center">
                                                Action
                                                <BiFilter />

                                            </div>
                                        </th> */}
                                    </tr>
                                </thead>

                                {
                                    music?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
                                        <tbody key={index}>

                                            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                                <td className="border-r">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="p-2 border-r flex items-center justify-center">
                                                    <audio controls>
                                                        <source src={i?.music} type="audio/mpeg" />
                                                    </audio>
                                                    {/* <img src={i?.profilePhoto} alt="" className="w-10" /> */}
                                                </td>
                                                <td className="p-2 border-r">{i?.musicName}</td>
                                                <td className="p-2 border-r">{i?.singer}</td>
                                                <td className="p-2 border-r">{i?.userId ? "user" : "admin"}</td>


                                                {/* <td className="flex justify-center text-2xl pt-1 ">
                                                    <AiOutlineEdit className="mx-4 text-green-700 cursor-pointer" onClick={() => handleOpenEdit(i?._id, i?.name, i?.email, i?.team, i?.role, i?.gender, i?.phone)} />
                                                    <AiOutlineDelete className="mx-4 text-red-800 cursor-pointer" onClick={() => handleOpenDelete(i?._id, i?.name)} />
                                                   
                                                </td> */}
                                            </tr>

                                        </tbody>
                                    ))
                                }

                            </table>

                            <table>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td><TablePagination
                                            rowsPerPageOptions={[5, 10, 100]}
                                            component="div"
                                            count={music?.length}
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

            </div>
            {/* //?Modal  */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <div className="mt-1">
                        <h1 className="text-black text-2xl font-bold">Add Music</h1>

                        <div className="flex items-center justify-center py-5 ">

                            <form action="" className="lg:flex ">
                                <div className="w-full">

                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            Singer Name
                                        </label>
                                        <input type="text" name="singerName" id="singerName" placeholder="Type Singer Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={inputs?.singerName} onChange={handleChange} />
                                    </div>

                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            Music Name
                                        </label>
                                        <input type="text" name="musicName" id="musicName" placeholder="Type Music Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={inputs?.musicName} onChange={handleChange} />
                                    </div>

                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            Music
                                        </label>
                                        <input type="file" name="upload_music" id="upload_music" placeholder="Upload Music" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={handleChangeFile} />
                                    </div>




                                </div>

                            </form>

                        </div>


                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleClose} className="mx-2 border-2 text-[#16a085] border-[#16a085] rounded-lg px-12 py-2 "> Cancel </button>
                        <button className="mx-2 border-2 bg-[#16a085] rounded-lg text-white px-12 py-2 " onClick={() => createUsers()}>Add Music </button>
                    </div>


                </Box>
            </Modal >
            <Modal
                open={bulkModalOpen}
                onClose={() => setBulkModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <div className="mt-1">
                        <h1 className="text-black text-2xl font-bold">Add Bulk Music</h1>

                        <div className="flex items-center justify-center py-5 ">

                            <form action="" className="lg:flex ">
                                <div className="w-full">

                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            Singer Name
                                        </label>
                                        <input type="text" name="singerName" id="singerName" placeholder="Type Singer Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={inputs?.singerName} onChange={handleChange} />
                                    </div>

                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            Music Name
                                        </label>
                                        <input type="text" name="musicName" id="musicName" placeholder="Type Music Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={inputs?.musicName} onChange={handleChange} />
                                    </div>

                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            Music
                                        </label>
                                        <input type="file" multiple name="upload_music" id="upload_music" placeholder="Upload Music" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={handleUploadBulkFiles} />
                                    </div>



                                </div>

                            </form>

                        </div>


                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => setBulkModalOpen(false)} className="mx-2 border-2 text-[#16a085] border-[#16a085] rounded-lg px-12 py-2 "> Cancel </button>
                        <button className="mx-2 border-2 bg-[#16a085] rounded-lg text-white px-12 py-2 " onClick={() => bulkMusicUpload()}>Add Music </button>
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
                                <div className="w-full">
                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            Name
                                        </label>
                                        <input type="text" name="Name" id="Name" placeholder="Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={singerName} onChange={(e) => setSingerName(e.target.value)} />
                                    </div>


                                    <div className="mb-2">
                                        <label htmlFor="lName" className=" block text-base font-medium  text-[#07074D]">
                                            Email
                                        </label>
                                        {/* <input type="email" name="email" id="email" placeholder="Email" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="Phone" className=" block text-base font-medium  text-[#07074D]">
                                            Phone
                                        </label>
                                        {/* <input type="number" name="Phone" id="Phone" placeholder="Phone" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
                                    </div>
                                    {/* <div className="mb-2">
                    <label htmlFor="Password" className=" block text-base font-medium  text-[#07074D]">
                      Password
                    </label>
                    <input type="password" name="Password" id="lName" placeholder="Password" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div> */}

                                </div>
                                <div className="w-full lg:ml-20">

                                    <div className="mb-2">
                                        <label htmlFor="gender" className=" block text-base font-medium  text-[#07074D]">
                                            Gender
                                        </label>
                                        {/* <select name="Gender" id="gender" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="" disabled> Select </option>
                                            <option value="male"> Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                        </select> */}

                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="status" className=" block text-base font-medium  text-[#07074D]">
                                            Status
                                        </label>
                                        {/* <select name="Gender" id="gender" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="" disabled> Select </option>
                                            <option value="male"> Completed</option>
                                            <option value="female">InComplete</option>
                                            <option value="others">Pending</option>
                                        </select> */}

                                    </div>




                                </div>
                            </form>

                        </div>


                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleCloseEdit} className="mx-2 border-2 text-[#16a085] border-[#16a085] rounded-lg px-12 py-2 "> Cancel </button>
                        <button className="mx-2 border-2 bg-[#16a085] rounded-lg text-white px-12 py-2 " onClick={() => updateUsers()}>Update  User </button>
                    </div>


                </Box>
            </Modal >

            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <div className="mt-1">
                        <h1 className="text-black text-2xl font-bold text-center">Are you sure want to Delete- </h1>
                        <h1 className="text-black text-2xl font-semibold text-center">"{name}" </h1>
                        <div className="flex justify-center mt-5">
                            <button onClick={handleCloseDelete} className="mx-2 border-2 text-[#16a085] border-[#16a085] rounded-lg px-12 py-2 "> Cancel </button>
                            <button className="mx-2 border-2 bg-[#16a085] rounded-lg text-white px-12 py-2 " onClick={deleteUser} >Delete User </button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </>
    )
}

export default Music