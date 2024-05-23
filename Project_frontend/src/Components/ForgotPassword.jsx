import React,{useState} from 'react'

const ForgotPassword = () => {
  const [email,setEmail] = useState('')
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-16 mx-auto">
      <div className="grid md:grid-cols-2 md:gap-[8rem] gap-8">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold md:text-3xl md:leading-tight ">Forgot Your Password?</h2>
          <p className="mt-3 text-gray-600">
            Enter your email address to reset your password.
          </p>
        </div>

        <form>
          <div className="w-full sm:max-w-lg md:ms-auto">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <div className="w-full">
                <label className="sr-only">Email Address</label>
                <input type="text" id="hero-input" name="hero-input" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter your email" />
              </div>
              <span className="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                Send Reset Email
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              We'll send you instructions on how to reset your password.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
