import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ABI } from '../utils/abi';

const Dashboard = () => {

  const [adminCount, setAdminCount] = useState()
  const [departmentCount, setDepartmentCount] = useState()

  useEffect(() => {
    const getData = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, ABI, provider);
      const admins = await contract.getCompanyAdmins()
      const departments = await contract.getAllDepartments()
      setAdminCount(Object.values(admins))
      setDepartmentCount(Object.values(departments))
    }

    getData()
  }, [])



  return (
    <div className="mx-auto max-w-[50rem] lg:max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mt-[5rem] overflow-x-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:ml-[20rem] gap-8">
        <FeatureCard
          icon={<ImmutableIcon />}
          title="Immutable"
          description="Data stored cannot be altered or tampered with, providing a high level of security."
        />
        <FeatureCard
          icon={<DecentralizedIcon />}
          title="Decentralized"
          description="Operates on a distributed network of computers, eliminating the need for a central authority."
        />
        <FeatureCard
          icon={<TransparentIcon />}
          title="Transparent"
          description="All transactions and data stored are publicly accessible, providing transparency."
        />
        <FeatureCard
          icon={<SecureIcon />}
          title="Secure"
          description="Utilizes cryptographic techniques to ensure the security and integrity of data and transactions."
        />
      </div>
      {departmentCount && adminCount && (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 lg:ml-[30rem] ">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col border shadow-sm rounded-xl bg-slate-900 border-gray-800">
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Total users
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-200">
                    6
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col border shadow-sm rounded-xl bg-slate-900 border-gray-800">
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Admins
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-200">
                    {adminCount.length}
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col border shadow-sm rounded-xl bg-slate-900 border-gray-800">
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Departments
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium  text-gray-200">
                    {departmentCount.length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex flex-col w-full lg:ml-[22rem]">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="lg:min-w-[50rem] min-w-[45rem] divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase rounded-xl">From</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-slate-900 even:bg-slate-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">0x13fdf...3ac</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">0.03 ETH</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">10:30 AM</td>
                    </tr>

                    <tr className="odd:bg-slate-900 even:bg-slate-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">0x2f63E...C2A</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">0.005 eth</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">12:45 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImmutableIcon = () => (
  <svg className="size-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="10" height="14" x="3" y="8" rx="2" />
    <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
    <path d="M8 18h.01" />
  </svg>
);

const DecentralizedIcon = () => (
  <svg className="size-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7h-9" />
    <path d="M14 17H5" />
    <circle cx="17" cy="17" r="3" />
    <circle cx="7" cy="7" r="3" />
  </svg>
);

const TransparentIcon = () => (
  <svg className="size-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const SecureIcon = () => (
  <svg className="size-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
  </svg>
);

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl ">
        {icon}
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Dashboard;
