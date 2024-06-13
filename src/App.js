// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with auth state logic

  useEffect(() => {
    // Check for existing authentication on app load (optional)
    const storedToken = localStorage.getItem('authToken'); // Replace with storage mechanism
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Store authentication token if successful (optional)
  };

  return (
    <div className="container mx-auto">
      {isLoggedIn ? <Dashboard /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
