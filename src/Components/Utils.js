// utils.js

// take in full date string and return YYYY-MM-DD
export const formatDate = (mysqlDateString) => {
  const date = new Date(mysqlDateString);

  // Extract year, month (0-indexed), and day for formatting
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad month for 2 digits
  const day = String(date.getDate()).padStart(2, "0"); // Pad day for 2 digits

  // Format the date in YYYY-MM-DD as expected by HTML5 date input
  return `${year}-${month}-${day}`;
};

// Function to check if an object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
