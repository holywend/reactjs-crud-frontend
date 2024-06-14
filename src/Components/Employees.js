import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { formatDate, isEmpty } from "./Utils";

const Employees = () => {
  // states
  const [employeesData, setEmployeesData] = useState([]);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState({});
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // read authToken from localStorage
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    window.location.href = "/";
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  // fetch employees data
  const fetchEmployees = async () => {
    if (!authToken) return; // Early return if no authToken

    setIsLoading(true);

    const getEmployeesAPIURL = `${process.env.REACT_APP_API_URL}api/v1/employees`;

    try {
      const response = await fetch(getEmployeesAPIURL, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token in headers
          "Content-Type": "application/json", // Assuming JSON data (optional)
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const fetchedData = await response.json();
      setEmployeesData(fetchedData);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (employee) => {
    try {
      const deleteEmployeeURL = `${process.env.REACT_APP_API_URL}api/v1/employees/${employee.id}`;

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token in headers
          "Content-Type": "application/json", // Assuming JSON data
        },
      };

      const response = await fetch(deleteEmployeeURL, options);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      setSelectedEmployeeData({});
      toast.success("Employee data deleted successfully!");

      await fetchEmployees(); // Call fetchData to refresh UI with confirmed data
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error(
        "An error occurred while deleting employee details. Please try again."
      ); // Display error toast
    }
  };

  const handleAddClick = () => {
    setSelectedEmployeeData({});
    setIsNewEmployee(true);
    setShowEmployeeForm(true);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployeeData(employee);
    setIsNewEmployee(false);
    setShowEmployeeForm(true);
  };
  const handleCloseForm = () => {
    setSelectedEmployeeData({});
    setIsNewEmployee(false);
    setShowEmployeeForm(false);
  };

  const handleSaveClick = (employee) => {
    if (isNewEmployee) {
      handleInsertEmployee(employee);
    } else {
      handleUpdateEmployee(employee);
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const employeeId = updatedEmployee.id;
      const updatedData = { ...updatedEmployee }; // Create a copy to avoid mutation
      delete updatedData.id; // Remove ID it's not part of the API endpoint requirements

      const updateEmployeesAPIURL = `${process.env.REACT_APP_API_URL}api/v1/employees/${employeeId}`;

      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token in headers
          "Content-Type": "application/json", // Assuming JSON data
        },
        body: JSON.stringify(updatedData), // Stringify data for sending
      };

      const response = await fetch(updateEmployeesAPIURL, options);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      setSelectedEmployeeData({});
      setIsNewEmployee(false);
      setShowEmployeeForm(false);

      toast.success("Employee details updated successfully!");

      await fetchEmployees(); // Call fetchData to refresh UI with confirmed data
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error(
        "An error occurred while updating employee details. Please try again."
      ); // Display error toast
    }
  };

  const handleInsertEmployee = async (newEmployee) => {
    try {
      const saveEmployeesAPIURL = `${process.env.REACT_APP_API_URL}api/v1/employees/`;

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token in headers
          "Content-Type": "application/json", // Assuming JSON data
        },
        body: JSON.stringify(newEmployee), // Stringify data for sending
      };

      const response = await fetch(saveEmployeesAPIURL, options);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      setSelectedEmployeeData({});
      setIsNewEmployee(false);
      setShowEmployeeForm(false);

      toast.success("Employee details saved successfully!");

      await fetchEmployees(); // Call fetchData to refresh UI with confirmed data
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error(
        "An error occurred while saving employee details. Please try again."
      ); // Display error toast
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Employees
      </h1>
      {isLoading && (
        <p className="text-center text-blue-500">Loading data...</p>
      )}
      <div className="flex justify-end">
        <button
          className="my-2 px-3 py-2 rounded text-white bg-green-500 hover:bg-green-700"
          onClick={() => handleAddClick()}
        >
          <FontAwesomeIcon icon={faPlusSquare} /> Add Employee
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-300">Fullname</th>
              <th className="px-4 py-2 border border-gray-300">
                Date of Birth
              </th>
              <th className="px-4 py-2 border border-gray-300">Sex</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.fullname}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {formatDate(item.dob)}
                </td>
                <td className="px-4 py-2 border border-gray-300">{item.sex}</td>
                <td className="px-4 py-2 border border-gray-300 flex justify-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={() => handleEditClick(item)}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                  <button
                    className="mr-2 text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleDeleteClick(item)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
        {(!isEmpty(selectedEmployeeData) || showEmployeeForm) && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-medium mb-4">{isNewEmployee ? 'New Employee' : 'Edit Employee'}</h3>
              {/* Form to edit employee details goes here */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  const formData = new FormData(e.target); // Create FormData object
                  const employeeData = {};
                  for (const [key, value] of formData.entries()) {
                    employeeData[key] = value;
                  }

                  handleSaveClick(employeeData);
                }}
              >
                {/* Form fields with initial values from selectedEmployeeData */}
                <input
                  hidden
                  readOnly
                  id="id"
                  name="id"
                  defaultValue={selectedEmployeeData.id}
                />
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="w-full mb-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Full Name"
                  defaultValue={selectedEmployeeData.fullname}
                  // Update form fields based on user input
                />

                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="w-full mb-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Date"
                  defaultValue={formatDate(selectedEmployeeData.dob)}
                />

                <select
                  id="sex"
                  name="sex"
                  class="w-full mb-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  defaultValue={selectedEmployeeData.sex}
                >
                  <option 
                    value="" 
                    selected={isNewEmployee}
                    disabled
                  >
                    Select Sex
                  </option>{" "}
                  {/* Placeholder option */}
                  <option
                    value="Male"
                    selected={selectedEmployeeData.sex === "Male"}
                  >
                    Male
                  </option>
                  <option
                    value="Female"
                    selected={selectedEmployeeData.sex === "Female"}
                  >
                    Female
                  </option>
                </select>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="text-gray-500 px-3 py-2 rounded border border-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </button>
                  <button 
                  type="submit" 
                  className="text-blue-500 px-3 py-2 rounded border border-blue-500 hover:text-blue-700 focus:outline-none"
                  // className="btn-blue"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
