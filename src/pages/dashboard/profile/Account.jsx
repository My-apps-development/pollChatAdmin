
import { AiOutlineDelete, AiOutlineCloudUpload } from "react-icons/ai"
const Account = () => {
  return (
    <>
      <div className="mt-8">
        <div className="flex">
          <div className="font-semibold text-xl mr-80 ml-10">Account Setting</div>
          <button className="px-12 py-2 bg-[#16a085] rounded-lg text-white font-bold text-right ml-96">Update</button>
        </div>
        <div className="flex">
          <div className="w-[40%]">

            <div className="flex items-center justify-center p-12">
              <div className="mx-auto w-full max-w-[550px]">
                <form action="" method="POST" className="">


                  <div className="mb-5">
                    <label htmlFor="fName" className="mb-3 block text-base font-medium text-[#07074D]">
                      First Name
                    </label>
                    <input type="text" name="fName" id="fName" placeholder="First Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>


                  <div className="mb-5">
                    <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
                      Last Name
                    </label>
                    <input type="text" name="lName" id="lName" placeholder="Last Name" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>


                  <div className="mb-5">
                    <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                      Email
                    </label>
                    <input type="email" name="email" id="lName" placeholder="Email" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>

                  <div className="flex ">
                    <div className="w-[30%]">
                      <label htmlFor="phones" className="mb-3 block text-base font-medium text-[#07074D]">Phone</label>
                      <select name="phones" id="phones" className="rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 ">
                        <option value="volvo"> +91</option>
                        <option value="saab">+92</option>
                        <option value="mercedes">+93</option>
                        <option value="audi">+94</option>
                      </select>
                    </div>
                    <div className="w-[70%] mt-6 ml-3 ">
                      <input type="Phone" name="Phone" id="lName" placeholder="Phone" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-3" />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="Address" className="mb-3 block text-base font-medium text-[#07074D]">
                      Address
                    </label>
                    <input type="text" name="Address" id="lName" placeholder="Address" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="City" className="mb-3 block text-base font-medium text-[#07074D]">
                      City
                    </label>
                    <input type="text" name="City" id="lName" placeholder="City" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>

                  <div className="flex">
                    <div className="w-[48%]">
                      <label htmlFor="phones" className="mb-3 block text-base font-medium text-[#07074D]">Country</label>
                      <select name="phones" id="phones" className="rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 w-full">
                        <option value="volvo"> India</option>
                        <option value="saab">USA</option>
                        <option value="mercedes">Canada</option>
                        <option value="audi">Nepal</option>
                      </select>
                    </div>
                    <div className="w-[48%] ml-[4%]">
                      <label htmlFor="State" className="mb-3 block text-base font-medium text-[#07074D]">State</label>
                      <select name="State" id="State" className="rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 w-full">
                        <option value="volvo"> Telangana</option>
                        <option value="saab">Uttar Pradesh</option>
                        <option value="mercedes">Tamil Nadu</option>
                        <option value="audi">Delhi</option>
                      </select>
                    </div>
                  </div>


                </form>
              </div>
            </div>

          </div>
          <div className="w-[30%] p-12 mt-2">
            <div className=" flex text-xl ml-28 mt-2 absolute">
              <AiOutlineCloudUpload className=" cursor-pointer bg-pink-200  rounded-lg" />
              <AiOutlineDelete className="ml-1 cursor-pointer bg-pink-200 rounded-lg" />
            </div>
            <img src="https://img.freepik.com/free-photo/indoor-shot-attractive-young-woman-with-glasses-posing-against-white-wall_273609-20347.jpg?w=1060&t=st=1694505251~exp=1694505851~hmac=47d7701cbee598028524f78fb4d5e7648c1cc1c516ce4bcbb6e077e97d1517bc" alt="" className="w-40 h-40 object-cover rounded-xl" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Account