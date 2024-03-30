import AdminDashboard from "../AdminDashboard"
import { RiAddFill } from 'react-icons/ri'
import { FiFilter } from 'react-icons/fi'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { useEffect, useState } from "react"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import { axiosInstance } from "../../../utils/axiosSetup"
import { errorMessage, successMessage } from "../../../utils/notificationManager"
import { BiFilter, BiCopy } from "react-icons/bi"
import Loader from "../../../components/layout/Loader"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdDisabledVisible } from "react-icons/md"

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
const Polls = () => {
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //?Users-----------------------------
  const [polls, setPolls] = useState()

  const [userId, setUserId] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState()
  const [gender, setGender] = useState("")
  const [role, setRole] = useState("")
  const [team, setTeam] = useState("")

  //?Modal2------------------------------------
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (id, name, email, team, role, gender, phone) => {
    setUserId(id)
    setName(name)
    setEmail(email)
    setTeam(team)
    setRole(role)
    setGender(gender)
    setPhone(phone)
    setPassword("")

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
    setName(name)

    setOpenDelete(true)

  }
  const handleCloseDelete = () => setOpenDelete(false);


  //?Table---------------------------------
  const [action, setAction] = useState("Completed")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const getPolls = async () => {
    try {
      clearAll()
      setLoader(true)
      const res = await axiosInstance.get('/poll/allPolls');
      if (res.data.success) {
        setPolls(res.data.polls)
      } else {
        errorMessage('Something Went Wrong While Fetching Polls !! 😓')
      }

      setLoader(false)
    } catch (error) {
      errorMessage(error?.response?.data?.message)
      setLoader(false)

    }
  }
  const clearAll = () => {
    setTeam("")
    setRole("")
    setGender("")
    setPassword("")
    setPhone("")
    setEmail("")
    setName("")
    setUserId("")
  }

  //? Users Create -------------------------------------------------------
  const createUsers = async () => {
    if (!name) {
      errorMessage('Enter Proper Name 😓')
      return
    }
    if (!email) {
      errorMessage('Enter Proper Email 😓')
      return
    }
    if (!phone || phone.length !== 10) {
      errorMessage('Enter Proper Phone 😓')
      return
    }
    if (!password || password.length < 6) {
      errorMessage('Your Password is too small 😓')
      return
    }
    if (!gender) {
      errorMessage('Select Gender 😓')
      return
    }
    if (!team) {
      errorMessage('Select Team/Company 😓')
      return
    }
    if (!role) {
      errorMessage('Select Role 😓')
      return
    }
    setLoader(true)
    try {
      const payload = {
        name,
        email,
        phone,
        password,
        gender,
        team,
        role,
      }
      const res = await axiosInstance.post('/polls', payload);
      if (res.statusText === "Created") {
        successMessage(`New User ${res?.data?.name} as role of ${res?.data?.role} Created Successfully 🎉🎉`)
      } else {
        errorMessage('Something Went Wrong While Creating Users !! 😓')
      }
      setLoader(false)
      getPolls()
      clearAll()
      handleClose()
    } catch (error) {
      errorMessage(error?.response?.data?.message)
      setLoader(false)

    }
  }
  //? Users Update -------------------------------------------------------
  const updateUsers = async () => {
    if (!name) {
      errorMessage('Enter Proper Name 😓')
      return
    }
    if (!email) {
      errorMessage('Enter Proper Email 😓')
      return
    }
    if (!phone || phone.length !== 10) {
      errorMessage('Enter Proper Phone 😓')
      return
    }
    // if (!password || password.length < 6) {
    //   errorMessage('Your Password is too small 😓')
    //   return
    // }
    if (!gender) {
      errorMessage('Select Gender 😓')
      return
    }
    if (!team) {
      errorMessage('Select Team/Company 😓')
      return
    }
    if (!role) {
      errorMessage('Select Role 😓')
      return
    }
    setLoader(true)
    try {
      const payload = {
        name,
        email,
        phone,
        // password,
        gender,
        team,
        role,
      }
      const res = await axiosInstance.patch(`/polls/${userId}`, payload);
      if (res.statusText === "OK") {
        successMessage(`User ${res?.data?.name} Updated Successfully 🎉🎉`)
      } else {
        errorMessage('Something Went Wrong While Updating User !! 😓')
      }
      setLoader(false)
      getPolls()
      clearAll()
      handleClose()
    } catch (error) {
      errorMessage(error?.response?.data?.message)
      setLoader(false)

    }
  }

  //? User delete --------------------------------
  const deleteUser = async () => {
    try {
      setLoader(true)
      const res = await axiosInstance.delete(`/polls/${userId}`);
      if (res.statusText === "No Content") {
        successMessage(`${name} Deleted Successfully`)
        getPolls()
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
  //?Table End---------------------------------



  useEffect(() => {
    getPolls()
  }, [])
  return (
    <>
      {loader ? <Loader /> : null}

      <AdminDashboard />
      <div className="pl-20 pt-12 bg-gray-200 md:pl-72 md:pt-32">
        <h1 className="text-3xl font-bold">Polls</h1>
        <div className="mt-10 mb-5 mr-10">
          <div className="text-lg">Polls List</div>
          {/* <div className="float-right flex bg-[#16a085] text-white px-10 py-2 -mt-10 cursor-pointer" onClick={handleOpen}>
            <RiAddFill className="m-1 " />
            <button className="" >Add a New User</button>
          </div> */}
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
                        Poll Id
                        <BiFilter />
                      </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <div className="flex items-center justify-center">
                        Question
                        <BiFilter />
                      </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <div className="flex items-center justify-center">
                        Options
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
                        Status
                        <BiFilter />
                      </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <div className="flex items-center justify-center">
                        View Result
                        <BiFilter />

                      </div>
                    </th>


                    {/* 
                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                      <div className="flex items-center justify-center">
                        Action
                        <BiFilter />

                      </div>
                    </th> */}
                  </tr>
                </thead>

                {
                  polls?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
                    <tbody key={index}>

                      <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                        <td className="border-r">
                          <input type="checkbox" />
                        </td>

                        <td className="p-2 border-r">{i?._id}</td>
                        <td className="p-2 border-r">{i?.question}</td>
                        <td className="p-2 border-r">
                          
                          {i?.optionA && <div className="border-2 border-black m-2 ">{i?.optionA}</div>}
                          {i?.optionB && <div className="border-2 border-black m-2 ">{i?.optionB}</div>}
                          {i?.optionC && <div className="border-2 border-black m-2 ">{i?.optionC}</div>}
                          {i?.optionD && <div className="border-2 border-black m-2 ">{i?.optionD}</div>}
                          
                        </td>
                        {/* <td className="p-2 border-r">{i?.responses.map((item, index) => (

                          <div className="border-2 border-black m-2 " key={index}>{item}</div>
                        ))}</td> */}

                        {/* <td className="p-2 border-r">{Math.floor(Math.random() * (1000 - 10 + 1)) + 10}</td> */}
                        <td className="p-2 border-r cursor-pointer">{i?.likeCount}</td>
                        <td className="p-2 border-r cursor-pointer">{i?.commentCount}</td>
                        <td className="p-2 border-r cursor-pointer">{i?.shareCount}</td>
                        <td className="p-2 border-r cursor-pointer">View result</td>


                        {action === "In-Progress" ? <td className="p-2 border-r text-blue-500 bg-blue-100">{action}</td> : null}
                        {action === "Pending" ? <td className="p-2 border-r text-gray-500 bg-gray-100">{action}</td> : null}
                        {action === "Completed" ? <td className="p-2 border-r text-green-500 bg-green-100">{action}</td> : null}
                        {/* 
                        <td className="p-2 border-r cursor-pointer">
                          <div className="flex items-center justify-center text-2xl gap-2">
                            <AiOutlineEdit className="text-green-700 cursor-pointer" onClick={() => handleOpenEdit(i?.id, i?.name, i?.email, i?.team, i?.role, i?.gender, i?.phone)} />
                            <AiOutlineDelete className="text-red-800 cursor-pointer" onClick={() => handleOpenDelete(i?.id, i?.name)} />
                          </div>
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
                      count={polls?.length}
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
            <h1 className="text-black text-2xl font-bold">Add a New User</h1>

            <div className="flex items-center justify-center py-5 ">

              <form action="" className="lg:flex ">
                <div className="w-full">
                  <div className="mb-2">
                    <label className=" block text-base font-medium  text-[#07074D]">
                      Name
                    </label>
                    <input type="text" name="Name" id="Name" placeholder="Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>


                  <div className="mb-2">
                    <label htmlFor="lName" className=" block text-base font-medium  text-[#07074D]">
                      Email
                    </label>
                    <input type="email" name="email" id="email" placeholder="Email" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="Phone" className=" block text-base font-medium  text-[#07074D]">
                      Phone
                    </label>
                    <input type="number" name="Phone" id="Phone" placeholder="Phone" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="Password" className=" block text-base font-medium  text-[#07074D]">
                      Password
                    </label>
                    <input type="password" name="Password" id="lName" placeholder="Password" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>

                </div>
                <div className="w-full lg:ml-20">

                  <div className="mb-2">
                    <label htmlFor="gender" className=" block text-base font-medium  text-[#07074D]">
                      Gender
                    </label>
                    <select name="Gender" id="gender" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="" disabled> Select </option>
                      <option value="male"> Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>

                  </div>


                </div>
              </form>

            </div>


          </div>
          <div className="flex justify-center">
            <button onClick={handleClose} className="mx-2 border-2 text-[#16a085] border-[#16a085] rounded-lg px-12 py-2 "> Cancel </button>
            <button className="mx-2 border-2 bg-[#16a085] rounded-lg text-white px-12 py-2 " onClick={() => createUsers()}>Add User </button>
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
                    <input type="text" name="Name" id="Name" placeholder="Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>


                  <div className="mb-2">
                    <label htmlFor="lName" className=" block text-base font-medium  text-[#07074D]">
                      Email
                    </label>
                    <input type="email" name="email" id="email" placeholder="Email" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="Phone" className=" block text-base font-medium  text-[#07074D]">
                      Phone
                    </label>
                    <input type="number" name="Phone" id="Phone" placeholder="Phone" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                    <select name="Gender" id="gender" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="" disabled> Select </option>
                      <option value="male"> Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>

                  </div>
                  <div className="mb-2">
                    <label htmlFor="status" className=" block text-base font-medium  text-[#07074D]">
                      Status
                    </label>
                    <select name="Gender" id="gender" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="" disabled> Select </option>
                      <option value="male"> Completed</option>
                      <option value="female">InComplete</option>
                      <option value="others">Pending</option>
                    </select>

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

export default Polls