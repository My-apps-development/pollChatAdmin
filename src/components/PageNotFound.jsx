
import {  useNavigate } from "react-router-dom"
const PageNotFound = () => {
    const navigate=useNavigate()
  return (
    <>
<main className="h-screen w-full flex flex-col justify-center items-center bg-[#16a085]">
  <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
  <div className="bg-white px-2 text-sm rounded rotate-12 absolute border-2 border-[#16a085] text-[#16a085] font-bold">
    Page Not Found
  </div>
  <button className="mt-5">
    <div className="relative inline-block text-sm font-medium text-white group active:text-orange-500 focus:outline-none focus:ring" onClick={()=>navigate("/")}>
      <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white group-hover:translate-y-0 group-hover:translate-x-0 " />
      <span className="relative block px-8 py-3 bg-[#16a085] border border-current hover:font-bold">
        <button >Go Home</button>
      </span>
    </div>
  </button>
</main>

       
    
    </>
  )
}

export default PageNotFound