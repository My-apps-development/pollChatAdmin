

const GeneralSetting = () => {
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
                    Website Name
                  </label>
                  <input type="text" name="fName" id="fName" value="Happy goings" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>


                <div className="mb-5">
                  <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
                    Website Description 
                  </label>
                  <input type="text" name="lName" id="lName" value="Event planner Website" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>


                <div className="mb-5">
                  <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
                    Website Logo 
                  </label>
                  <input type="file"  className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" placeholder=""/>
                </div>


                <div className="mb-5">
                  <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Email
                  </label>
                  <input type="email" name="email" id="lName" placeholder="Email" className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" value="abcsd@gmail.com"/>
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

 




              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  </>
  )
}

export default GeneralSetting