import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useParams } from 'react-router-dom'
import { ABI } from '../utils/abi'

const Department = () => {

  const { departmentAddress } = useParams()
  const [departmentData, setDepartmentData] = useState(null)
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    const getDepartmentData = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, ABI, provider);
        const data = await contract.getDepartmentData(departmentAddress)
        console.log(data)
        setDepartmentData(Object.values(data))
      } catch (error) {
        console.error("Error fetching the data :", error)
      }
    }
    getDepartmentData()
  }, [departmentAddress])

  const formatAddress = (address) => {
    const firstThree = address.slice(0, 10);
    const lastThree = address.slice(-5);
    return `${firstThree} ... ${lastThree}`;
  };
  const format_Address = (address) => {
    const firstThree = address.slice(0, 6);
    const lastThree = address.slice(-4);
    return `${firstThree} ... ${lastThree}`;
  };

  const handleAddadmin = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, ABI, signer)
    const tx = await contract.setDepartmentAdmin(departmentAddress, address, departmentData[2])
    const receipt = await tx.wait()
    console.log(receipt.hash)
  }

  const increaseFunds = () => {
    setBalance(balance + +amount)
  }

  const checkStatus = async (amount) => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, ABI, provider);
    return await contract.requestStatus(departmentAddress, amount)
  }

  return (
    <div>
      {!departmentData && (
        <>
          <div className="flex w-[10rem] animate-pulse lg:mt-[1rem] absolute right-5 top-0">
            <div className="ms-4 mt-2 w-full">
              <h3 class="h-6 bg-gray-400 rounded-full"></h3>
            </div>
          </div>
          <div className="flex w-full animate-pulse lg:mt-[2rem]">
            <div className="ms-4 mt-2 w-full">
              <h3 class="w-[20rem] h-5 bg-gray-400 rounded-full"></h3>
            </div>
          </div>
          <div className="flex w-full animate-pulse lg:mt-[1rem]">
            <div className="ms-4 mt-2 w-full">
              <h3 class="h-4 bg-gray-400 rounded-full my-2"></h3>
              <h3 class="h-4 bg-gray-400 rounded-full my-5"></h3>
              <h3 class="h-4 bg-gray-400 rounded-full my-5"></h3>
            </div>
          </div>
        </>
      )}
      {departmentData && (
        <div className='mt-[5rem] ml-2 lg:mt-[2rem]'>
          <div className='items-center flex flex-col gap-2 absolute right-4 top-[5rem] lg:top-5'>
            <div className='text-2xl items-center flex flex-row'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="IconChangeColor" height="30" width="30"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" id="mainIconPathAttribute" ></path></svg>
              {`${balance} ETH`}
            </div>
            <div>
              {format_Address(departmentAddress)}
            </div>
          </div>
          <span className='flex justify-center text-5xl my-4'>{departmentData[2]}</span>
          <div className='mt-10'>
            <h2 className='flex justify-center text-xl my-5 ml-[1rem]'>Admins</h2>
            <ul>
              {departmentData[0].map((address, index) => (
                <div key={index} className='flex flex-row gap-2 items-center my-2 ml-[2rem]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                  <li>{formatAddress(address)}</li>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <div className='flex justify-center text-3xl mt-[5rem] mb-4'>Requests</div>
            <div class="flex flex-col">
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Amount (ETH)</th>
                          <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {departmentData[3].map((request, index) => (
                          <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{request.toString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {checkStatus(request) ? 'Approved' : 'Pending'}
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
        </div>
      )}
      <button type="button" className="py-3 px-4 ml-[3rem] mt-[5rem] inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-vertically-centered-modal">
        <svg className="icon icon-tabler icon-tabler-plus" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none" /><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>
        Add Admin
      </button>
      <div id="hs-vertically-centered-modal" className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-auto">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">
                Add Admin
              </h3>
              <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100" data-hs-overlay="#hs-vertically-centered-modal">
                <span className="sr-only">Close</span>
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="text-gray-800 my-4">
                Enter the details of the new Admin to be added
              </p>
              <input
                type="text"
                className="py-3 my-2 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter the address of the Admin"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t ">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50" data-hs-overlay="#hs-vertically-centered-modal">
                Close
              </button>
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" onClick={handleAddadmin}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <input type="text" onChange={(e) => setAmount(e.target.value)} class="py-3 mt-10 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter the amount of ETH"/>
          <button type="button" onClick={() => increaseFunds()} class="py-3 mb-3 ml-[3.5rem] mt-10 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Transfer funds
          </button>
      </div>
    </div>
  )
}

export default Department
