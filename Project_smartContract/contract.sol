// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanyFunds {
    struct Department {
        address[] admins;
        mapping(address => bool) isAdmin;
        uint256 balance;
        mapping(uint256 => bool) requests;
        string departmentName;
        uint256[] requestsLists;
    }

    address public companyAccount;
    address[] public companyAdmins;
    mapping(address => Department) public departments;
    address[] public allDepartments;

    constructor() {
        companyAccount = msg.sender;
        companyAdmins.push(msg.sender);
    }

    modifier onlyCompanyAdmin() {
        require(isCompanyAdmin(msg.sender), "Only company admin is allowed");
        _;
    }

    modifier onlyDepartmentAdmin(address department) {
        require(
            departments[department].isAdmin[msg.sender],
            "Only department admin is allowed"
        );
        _;
    }

    function isCompanyAdmin(address _admin) public view returns (bool) {
        for (uint256 i = 0; i < companyAdmins.length; i++) {
            if (companyAdmins[i] == _admin) {
                return true;
            }
        }
        return false;
    }

    function setCompanyAdmin(address _admin) external {
        require(
            msg.sender == companyAccount,
            "Only company account can set admins"
        );
        companyAdmins.push(_admin);
    }

    function setDepartmentAdmin(
        address _department,
        address _admin,
        string memory _departmentName
    ) external onlyCompanyAdmin {
        departments[_department].isAdmin[_admin] = true;
        departments[_department].admins.push(_admin);
        departments[_department].departmentName = _departmentName;

        if (!contains(allDepartments, _department)) {
            allDepartments.push(_department);
        }
    }

    function contains(address[] memory array, address element)
        internal
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return true;
            }
        }
        return false;
    }

    function requestFunds(address _address, uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            departments[_address].balance + _amount >=
                departments[_address].balance,
            "Integer overflow"
        );
        departments[_address].requests[_amount] = true;
        departments[_address].requestsLists.push(_amount);
    }

    function approveFunds(address _department)
        external
        payable
        onlyCompanyAdmin
    {
        departments[_department].balance += msg.value;
        departments[_department].requests[msg.value] = false;
    }

    function withdraw(address _address, uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        departments[_address].balance -= _amount;
        payable(_address).transfer(_amount);
    }

    function getCompanyBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getDepartmentBalance(address _department)
        external
        view
        returns (uint256)
    {
        return departments[_department].balance;
    }

    function getCompanyAdmins() external view returns (address[] memory) {
        return companyAdmins;
    }

    function getAllDepartments() external view returns (address[] memory) {
        return allDepartments;
    }

    function getDepartmentData(address _departmentAddress)
        external
        view
        returns (
            address[] memory,
            uint256,
            string memory,
            uint256[] memory
        )
    {
        Department storage department = departments[_departmentAddress];
        return (
            department.admins,
            department.balance,
            department.departmentName,
            department.requestsLists
        );
    }

    function requestStatus(address _address, uint256 _amount) external view returns(bool){
        return departments[_address].requests[_amount];
    }
}
