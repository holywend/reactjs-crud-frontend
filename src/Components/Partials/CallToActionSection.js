const CallToAction = () => {
  return (
    <section className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <p className="text-center text-lg">Ready to take the next step?</p>
        <div className="mt-4"> {/* Add a new div for separation */}
          <a
            href="#"
            className="inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
          >
            Sign Up Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;