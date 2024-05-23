import { createContext, useContext, useState } from "react";

const ContractContext =  createContext()

export const UseContractContext = () => {
    return useContext(ContractContext)
}

export const ContractProvider = ({ children }) => {
    const [department, setDepartment] = useState(null)
    const [address, setAddress] = useState(null)
    return(
        <ContractContext.Provider value={{department, address, setDepartment, setAddress}}>
            { children }
        </ContractContext.Provider>
    )
}