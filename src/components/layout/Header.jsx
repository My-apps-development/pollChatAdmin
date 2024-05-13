import { useEffect, useState } from "react"
import { MdNotificationsNone } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from "@mui/material";
import { errorMessage } from "../../utils/notificationManager";
import { axiosInstance } from "../../utils/axiosSetup";

const Header = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({ right: false })
    const [notificationList, setNotificationList] = useState([])


    const style = {
        position: 'absolute',
        top: '42%',
        left: '68%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        p: 2,
        border: '1px solid #910033',
    };

    // ----------------------------------------------- notification api start -------------------------------------------------------


    const notifications = async () => {
        try {
            const response = await axiosInstance.get("/notification/")
            const data = await response?.data
            setNotificationList(data?.notification);
        } catch (error) {
            errorMessage(error?.response?.data?.message)
        }
    }

    console.log(notificationList);
    // ----------------------------------------------- notification api end ---------------------------------------------------------

    useEffect(() => {

        notifications()

    }, [])

    return (
        <>
            {/* <!-- component --> */}
            <div className='shadow-xl'>
                <header className="header z-10 fixed w-[100%] top-0 bg-white shadow-md flex items-center justify-between px-8 pt-5 pb-2 max-[1100px]:pt-1 antialiased">
                    {/* <!-- logo --> */}
                    <h1 className="mx-2  cursor-pointer" onClick={() => navigate("/")}>
                        <img src="https://as1.ftcdn.net/v2/jpg/04/79/73/88/1000_F_479738870_pvvl7YSRxQfFz4Pj7dV58GYnRaN8kQ6r.jpg" alt="logo" className='w-20' />
                    </h1>

                    <div className="w-1/2 ml-20 ">
                        <input placeholder="Search" className="px-2 mx-10 border-2 border-gray-300 h-12 w-[70%] rounded-lg bg-gray-200" name="text" type="text" />
                    </div>
                    <div className=" w-[4%] ">
                        <MdNotificationsNone className="text-2xl cursor-pointer" onClick={() => setState((prevState) => ({ ...prevState, right: true }))} />
                    </div>
                    <div className="w-[15%] flex cursor-pointer" onClick={() => navigate("/profile")}>
                        <img src="https://img.freepik.com/free-photo/indoor-shot-attractive-young-woman-with-glasses-posing-against-white-wall_273609-20347.jpg?w=1060&t=st=1694505251~exp=1694505851~hmac=47d7701cbee598028524f78fb4d5e7648c1cc1c516ce4bcbb6e077e97d1517bc" alt="profile" className="w-10 h-10 rounded-full object-cover m-2 hover:scale-110" />
                        <p className="m-2 pt-2 font-semibold hover:scale-110" >Alice Perry</p>
                    </div>


                </header>

                <div>
                    <Drawer
                        anchor="right"
                        open={state.right}
                        classes={{
                            paper: { ...style },
                        }}
                        PaperProps={{
                            sx: { width: "30%" },
                        }}
                    >
                        <div>
                            <div className="flex justify-between items-center w-full font-semibold px-4">
                                <h1 className="text-2xl mt-4">Notifications</h1>
                                <button className="p-2 w-10 h-10 flex justify-center items-center text-center rounded-full border-2 border-[#16a085] bg-[#16a085] text-white hover:scale-95 hover:duration-300 hover:bg-inherit hover:border-2 hover:border-[#16a085] hover:text-gray-500 mt-4" onClick={() => { setState((prevState) => ({ ...prevState, right: false })) }
                                }><CloseIcon /></button>
                            </div>

                            <div className="mt-10 flex justify-center items-center w-full gap-2 flex-col">
                                {notificationList?.map((notification, index) => {
                                    return (
                                        <div key={index} className="flex flex-col p-5 font-semibold shadow-xl border-2 w-full">
                                            <div className="flex justify-between items-center capitalize">
                                                <h1 className="text-sm">{notification?.notification}</h1>
                                                <p className="text-xs">{notification?.time}</p>
                                            </div>
                                            <div className="flex justify-between items-center capitalize text-xs">
                                                <p>{notification?.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </Drawer>
                </div>

            </div>
        </>
    )
}

export default Header