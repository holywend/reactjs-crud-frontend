const FeatureSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-bold mb-2">Feature 1</h3>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-bold mb-2">Feature 2</h3>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-bold mb-2">Feature 3</h3>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </section>
  );
};

export default FeatureSection;
