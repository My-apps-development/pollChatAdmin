import { useState } from "react";
import TablePagination from '@mui/material/TablePagination';

import { BiFilter, BiCopy } from "react-icons/bi"

export default function VendorsTable() {
    const [action, setAction] = useState("Completed")
    let arr = [
        { name: "Janet Adebayo", id: 0 },
        { name: "Janet Adebayo1", id: 1 },
        { name: "Janet Adebayo12", id: 1 },
        { name: "Janet Adebayo12", id: 1 },
        { name: "Janet Adebayo12", id: 1 },
        { name: "Janet Adebayo12", id: 1 },
        { name: "Janet Adebayo126", id: 1 },
        { name: "Janet Adebayo126", id: 1 },
        { name: "Janet Adebayo123", id: 1 },
        { name: "Janet Adebayo123", id: 1 },

    ]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (

        <div className="table w-full p-2">
            <table className="w-full border">
                <thead>
                    <tr className=" border-b">
                        <th className="border-r">
                            <input type="checkbox" />
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                            <div className="flex items-center justify-center">
                                Vendor Name
                                <BiFilter />
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                            <div className="flex items-center justify-center">
                                 Date Added
                                <BiFilter />
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                            <div className="flex items-center justify-center">
                                Category
                                <BiFilter />
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                            <div className="flex items-center justify-center">
                                Location
                                <BiFilter />
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                            <div className="flex items-center justify-center">
                                Pricing
                                <BiFilter />
                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                            <div className="flex items-center justify-center">
                                Action
                                <BiFilter />

                            </div>
                        </th>
                        <th className="p-2 border-r cursor-pointer text-sm font-semibold text-gray-500">
                            <div className="flex items-center justify-center">
                                Status
                                <BiFilter />

                            </div>
                        </th>
                    </tr>
                </thead>

                {
                    arr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
                        <tbody key={index}>

                            <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                                <td className="border-r">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-2 border-r">{i.name}</td>
                                <td className="p-2 border-r">12 Aug 2022</td>
                                <td className="p-2 border-r">Photographers</td>
                                <td className="p-2 border-r">Delhi</td>
                            
                                <td className="p-2 border-r">₦25,000.00</td>
                                <td>
                                    <div>
                                        <select name="values" id="values" onChange={(event) => setAction(event.target.value)}>
                                            <option value="Completed">Completed</option>
                                            <option value="In-Progress">In-Progress</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </div>

                                </td>
                                {action === "In-Progress" ? <td className="p-2 border-r text-blue-500 bg-blue-100">{action}</td> : null}
                                {action === "Pending" ? <td className="p-2 border-r text-gray-500 bg-gray-100">{action}</td> : null}
                                {action === "Completed" ? <td className="p-2 border-r text-green-500 bg-green-100">{action}</td> : null}
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
                            count={arr.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /></td>

                    </tr>
                </tbody>
            </table>
        </div>

    );
}
