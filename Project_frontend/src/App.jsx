// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login, Dashboard, AddAdmin, AddDepartment, Department } from './Pages';
import { ForgotPassword, ResetPassword, Sidebar } from './Components';
import PrivateRoute from './routing/PrivateRoute';
import { ContractProvider } from './Hooks/UseContractContext';

const App = () => {
  return (
    <div className='w-full'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/*"
            element={
              <ContractProvider>
                <>
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/addadmin" element={<AddAdmin />} />
                    <Route path='/adddepartment' element={<AddDepartment/>} />
                    <Route path='/department/:departmentAddress' element={<Department/>} />
                  </Routes>
                </>
              </ContractProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
