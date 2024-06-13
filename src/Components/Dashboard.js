import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const authToken =  localStorage.getItem('authToken'); 
  if (!authToken) {
    window.location.href = '/'; // back to login
  }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Assuming your API endpoint is at http://localhost:3000/api/data
  const employeesAPIURL = `${process.env.REACT_APP_API_URL}api/v1/employees`;

  useEffect(() => {
    const fetchData = async () => {
      if (!authToken) return; // Early return if no authToken

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(employeesAPIURL, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include Bearer token in headers
            'Content-Type': 'application/json', // Assuming JSON data (optional)
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to format the date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
    // return date.toLocaleDateString();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/'; // back to login
  }

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Dashboard</h1>
      <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2">Logout</button>
      {isLoading && <p className="text-center text-blue-500">Loading data...</p>}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-300">Fullname</th>
              <th className="px-4 py-2 border border-gray-300">Date of Birth</th>
              <th className="px-4 py-2 border border-gray-300">Sex</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                <td className="px-4 py-2 border border-gray-300">{item.fullname}</td>
                <td className="px-4 py-2 border border-gray-300">{formatDate(item.dob)}</td>
                <td className="px-4 py-2 border border-gray-300">{item.sex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
