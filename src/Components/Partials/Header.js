const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Brand</h1>
        <nav className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            Features
          </a>
          <a href="#" className="hover:text-gray-300">
            About Us
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
          <a href="/admin" className="hover:text-gray-300">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
