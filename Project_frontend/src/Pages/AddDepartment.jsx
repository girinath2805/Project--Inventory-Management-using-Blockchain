import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { ABI } from '../utils/abi';


const AddDepartment = () => {
  const [departments, setDepartments] = useState(null);
  const [address, setAddress] = useState('')
  const [depName, setDepName] = useState('')
  const [depAddress, setDepAddress] = useState('')
  const [depAdmin, setDepAdmin] = useState('')

  useEffect(() => {
    const getDepartment = async () => {

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, ABI, provider);
        const departmentAddress = await contract.getAllDepartments();
        setDepartments(Object.values(departmentAddress))
      } catch (error) {
        console.error("Error fetching the department addresses :", error)
      }
    };

    getDepartment();
  }, []);

  const handleEdit = (address) => {
    console.log(address)
  }

  const handleDelete = (address) => {
    console.log(address)
  }

  const handleAddDepartment = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, ABI, signer)
    const tx = await contract.setDepartmentAdmin(depAddress, depAdmin, depName)
    const receipt = await tx.wait()
    console.log(receipt.hash)
    window.location.reload()
  }


  // Function to render the edit and delete buttons
  const renderButtons = (address) => (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:text-red-700 disabled:opacity-50 disabled:pointer-events-none mx-5"
        onClick={() => handleDelete(address)}
      >
        Delete
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none mx-5"
        onClick={() => handleEdit(address)}
      >
        Edit
      </button>
    </>
  );

  const formatAddress = (address) => {
    const firstThree = address.slice(0, 7);
    const lastThree = address.slice(-3);
    return `${firstThree} ... ${lastThree}`;
  };

  return (
    <div className='wrapper'>
      <div className="flex flex-col bg-white p-3 rounded-xl justify-center items-center mx-auto">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div>
              <div className='px-6 py-4 grid gap-8 md:flex md:justify-between md:items-center'>
                <h2 className="text-xl font-semibold text-gray-800">
                  Departments
                </h2>
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-vertically-centered-modal">
                  <svg className="icon icon-tabler icon-tabler-plus" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none" /><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>
                  Add Department
                </button>
                <div id="hs-vertically-centered-modal" className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-auto">
                  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl">
                      <div className="flex justify-between items-center py-3 px-4 border-b">
                        <h3 className="font-bold text-gray-800">
                          Add Department
                        </h3>
                        <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100" data-hs-overlay="#hs-vertically-centered-modal">
                          <span className="sr-only">Close</span>
                          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                      </div>
                      <div className="p-4 overflow-y-auto">
                        <p className="text-gray-800 my-4">
                          Enter the details of the new Department to be added
                        </p>
                        <input
                          type="text"
                          className="py-3 my-2 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Enter the name of the Department"
                          onChange={(e) => setDepName(e.target.value)}
                        />
                        <input
                          type="text"
                          className="py-3 my-2 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Enter the Department address"
                          onChange={(e) => setDepAddress(e.target.value)}
                        />
                        <input
                          type="text"
                          className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                          placeholder="Enter the Admin Address"
                          onChange={(e) => setDepAdmin(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t ">
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50" data-hs-overlay="#hs-vertically-centered-modal">
                          Close
                        </button>
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" onClick={handleAddDepartment}>
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Address</th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {!departments && (
                    <>
                      <tr className="flex animate-pulse w-full">
                        <div className="ms-4 mt-2 w-full">
                          <ul className="mt-5 space-y-3 w-full">
                            <li className="w-full my-2 h-4 bg-gray-200 rounded-full"></li>
                          </ul>
                        </div>
                      </tr>
                      <tr className="flex animate-pulse w-full">
                        <div className="ms-4 mt-2 w-full">
                          <ul className="mt-5 space-y-3 w-full">
                            <li className="w-full my-2 h-4 bg-gray-200 rounded-full"></li>
                          </ul>
                        </div>
                      </tr>
                      <tr className="flex animate-pulse w-full">
                        <div className="ms-4 mt-2 w-full">
                          <ul className="mt-5 space-y-3 w-full">
                            <li className="w-full my-2 h-4 bg-gray-200 rounded-full"></li>
                          </ul>
                        </div>
                      </tr>
                    </>
                  )}

                  {departments &&
                    departments.map((department, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formatAddress(department)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          {renderButtons(department)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDepartment
