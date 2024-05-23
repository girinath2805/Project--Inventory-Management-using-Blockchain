import React, { useState, useEffect } from 'react'

const ResetPassword = () => {

  const [newpassword,SetNewpassword] = useState('')
  const [confirmpassword,SetConfirmpassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if ( confirmpassword != newpassword){
      setError('Password does not match')
    }
  },[confirmpassword])

  return (
    <div className='flex flex-col gap-8 bg-white p-7 rounded-lg px-[3rem]'>
      <span className='text-black text-2xl my-4'>Create new password</span>
      <div>
        <div className="relative">
          <label className="block text-sm font-medium mb-2">New password</label>
          <input type="password" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="password" onChange={(e) => SetNewpassword(e.target.value)} />
        </div>
      </div>
      <div>
      <div className="relative">
          <label className="block text-sm font-medium mb-2">Confirm password</label>
          <input type="password" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="password" onChange={(e) => SetConfirmpassword(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
