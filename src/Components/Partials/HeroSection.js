const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold leading-tight mb-4">
          Your Compelling Headline
        </h2>
        <p className="text-gray-700 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <a
          href="#"
          className="inline-block px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-700 rounded"
        >
          Get Started Now
        </a>
      </div>
      <div className="w-full md:w-1/2">
        <img
          src="your-image.jpg"
          alt="Image describing your product/service"
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};
export default HeroSection;
