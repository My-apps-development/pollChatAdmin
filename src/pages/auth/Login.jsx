import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../utils/axiosSetup"
import { errorMessage, successMessage } from "../../utils/notificationManager"
import Loader from "../../components/Loader"
const Login = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async (e) => {
        try {
            e.preventDefault()
            setLoader(true)
            const res = await axiosInstance.post('/admin/login',{email,password});
            if (res.data.success) {
                successMessage(res.data.message);
                localStorage.setItem("token", res.data.token);
                navigate('/')
            } 
            setLoader(false)
        } catch (error) {
            console.log(error);
            errorMessage(error.response.data.message)
            setLoader(false)
        }
    }
    return (
        <>
       {loader&& <Loader/>}
            <section className="flex flex-col md:flex-row h-screen items-center">

                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                    <div className="w-full h-100">
                        <div className="flex justify-center items-center">
                            <img src="https://as1.ftcdn.net/v2/jpg/04/79/73/88/1000_F_479738870_pvvl7YSRxQfFz4Pj7dV58GYnRaN8kQ6r.jpg" alt="logo" className="w-[50%]" />
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-sm md:text-sm leading-tight mt-12 font-semibold">Admin Panel</p>
                        </div>

                        <form className="mt-6" >

                            <div>
                                <label className="block text-gray-700">Email </label>
                                <input type="email" name id placeholder="Enter Email" className="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoComplete required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Password</label>
                                <input type="password" name id placeholder="Enter Password" minLength={6} className="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {/* <div className="text-right mt-2">
                                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
                            </div> */}

                            <button type="submit" className="w-full block bg-[#16a085] hover:bg-white   hover:text-[#16a085] border-2 border-[#16a085]  text-white font-semibold rounded-lg px-4 py-3 mt-6" onClick={(e) => login(e)}>Log In</button>
                        </form>




                    </div>
                </div>
            </section>
        </>
    )
}

export default Login