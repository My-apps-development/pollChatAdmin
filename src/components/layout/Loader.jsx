import { useState } from "react";


const Loader = () => {
    const [message, setMessage] = useState('')
    setTimeout(() => {
        setMessage('Please wait...')
    }, 2000);
    return (
        <div className=''>
            <div
                id='modal'
                className="fixed z-1500 inset-0 bg-gray-400 bg-opacity-25 backdrop-blur-[1px] flex items-center justify-center ">
                <svg fill="none" className="w-24 h-24 font-bold animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z" fill="currentColor" fillRule="evenodd" />
                </svg>
                <br />
                <h1 className="text-xl font-bold">

                    {message}
                </h1>
            </div>


        </div>
    )
}

export default Loader