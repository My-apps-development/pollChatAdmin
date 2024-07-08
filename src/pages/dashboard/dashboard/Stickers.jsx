import { Box, Modal, TablePagination } from "@mui/material"
import AdminDashboard from "../AdminDashboard"
import { useEffect, useState } from "react"
import { BiFilter } from "react-icons/bi"
import { errorMessage, successMessage } from "../../../utils/notificationManager"
import { axiosInstance } from "../../../utils/axiosSetup"
import { AiOutlineDelete } from "react-icons/ai"
import { RiAddFill } from "react-icons/ri"


const Stickers = () => {
    const [stickers, setStickers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [inputs, setInputs] = useState({
        image: null,
        category: ""
    })
    const [open, setOpen] = useState(false)
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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeFile = (e) => {
        e.preventDefault()

        const file = e.target.files[0]

        setInputs({ ...inputs, image: file })


    }

    const createSticker = async () => {
        // e.preventDefault()

        const fD = new FormData()
        fD.append("category", inputs?.category)
        fD.append("image", inputs?.image)

        try {
            const response = await axiosInstance.post("/sticker/create", fD, { headers: { "Content-Type": "multipart/form-data" } })
            const data = await response?.data
            successMessage(data?.message)
            setOpen(false)
            // setStickers(data?.stickers)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    const getStickers = async () => {
        try {
            const response = await axiosInstance.get("/sticker/get")
            const data = await response?.data
            setStickers(data?.stickers)
        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    const deleteSticker = async (_id) => {
        try {
            // setLoader(true)
            const res = await axiosInstance.delete(`/sticker/delete/${_id}`);
            if (res.data.success) {
                successMessage(res?.data?.message)
                getStickers()
                // handleCloseDelete()
            } else {
                errorMessage('Something Went Wrong While Deleting Stciker !! 😓')
            }
            // setLoader(false)
        } catch (error) {
            errorMessage(error.message)
            // setLoader(false)
        }
    }

    console.log(stickers);

    useEffect(() => {
        getStickers()
    }, [])
    return (
        <div>
            <AdminDashboard />
            <div className="pl-20 pt-12 bg-gray-200 md:pl-72 md:pt-32">
                <div className="float-end flex justify-center w-48 items-center gap-3 bg-[#16a085] text-white py-2 cursor-pointer" onClick={handleOpen}>
                    <RiAddFill className="" />
                    <button className="" >Add Sticker</button>
                </div>
                <div className="mt-10">
                    <h1 className="text-3xl font-bold">Stickers</h1>
                </div>
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
                                            stickers
                                            <BiFilter />
                                        </div>
                                    </th>
                                    <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                        <div className="flex items-center justify-center">
                                            stickers Name
                                            <BiFilter />
                                        </div>
                                    </th>
                                    {/* <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                                        <div className="flex items-center justify-center">
                                            Singer Name
                                            <BiFilter />
                                        </div>
                                    </th> */}
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
                                stickers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
                                    <tbody key={index} className="text-center">

                                        <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                            <td className="border-r">
                                                <input type="checkbox" />
                                            </td>
                                            <td className="p-2 border-r flex items-center justify-center">
                                                {/* <audio controls>
                                                    <source src={i?.stickers} type="audio/mpeg" />
                                                </audio> */}
                                                <img src={i?.media} alt="" className="w-10" />
                                            </td>
                                            <td className="p-2 border-r">{i?.category}</td>
                                            {/* <td className="p-2 border-r">{i?.singer}</td>
                                            <td className="p-2 border-r">{i?.userId ? "user" : "admin"}</td> */}


                                            <td className="text-2xl pt-1 flex justify-center items-center">
                                                {/* <AiOutlineEdit className="mx-4 text-green-700 cursor-pointer" onClick={() => handleOpenEdit(i?._id, i?.name, i?.email, i?.team, i?.role, i?.gender, i?.phone)} /> */}
                                                <AiOutlineDelete className="mx-4 text-red-800 cursor-pointer "
                                                    onClick={() => deleteSticker(i?._id, i?.name)}
                                                />

                                            </td>
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
                                        count={stickers?.length}
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
                        <h1 className="text-black text-2xl font-bold">Add stickers</h1>

                        <div className="flex items-center justify-center py-5 ">

                            <form action="" className="lg:flex ">
                                <div className="w-full">

                                    {/* <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            Singer Name
                                        </label>
                                        <input type="text" name="singerName" id="singerName" placeholder="Type Singer Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={inputs?.singerName} onChange={handleChange} />
                                    </div> */}

                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            stickers Name
                                        </label>
                                        <input type="text" name="category" id="stickersName" placeholder="Type stickers Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value={inputs?.category} onChange={(e) => setInputs((prevInputs) => ({
                                            ...prevInputs,
                                            [e.target.name]: e.target.value
                                        }))} />
                                    </div>

                                    <div className="mb-2">
                                        <label className=" block text-base font-medium  text-[#07074D]">
                                            stickers
                                        </label>
                                        <input type="file" name="upload_stickers" id="upload_stickers" placeholder="Upload stickers" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6  text-base font-medium  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={handleChangeFile} />
                                    </div>




                                </div>

                            </form>

                        </div>


                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleClose} className="mx-2 border-2 text-[#16a085] border-[#16a085] rounded-lg px-12 py-2 "> Cancel </button>
                        <button type="button" className="mx-2 border-2 bg-[#16a085] rounded-lg text-white px-12 py-2 " onClick={() => createSticker()}>Add stickers </button>
                    </div>


                </Box>
            </Modal >
        </div>
    )
}

export default Stickers