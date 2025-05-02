export function InterestsModal() {
  return (
    <div className="bg-cream bg-opacity-90 p-8 rounded-xl shadow-xl max-w-md w-full">
      <h2 className="text-3xl font-bold text-caramel mb-6 text-center">
        Let's Get Started
      </h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-lg font-medium text-caramel">
            What are your interests?
          </p>
          <textarea
            className="w-full p-3 border border-jotty-sage rounded-lg focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-caramel">
            What are your goals for journaling?
          </p>
          <textarea
            className="w-full p-3 border border-jotty-sage rounded-lg focus:ring-2 focus:ring-jotty-caramel focus:border-transparent"
            rows={3}
          />
        </div>
        <button className="w-full py-2 bg-caramel text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors">
          Continue
        </button>
      </div>
    </div>
  );
}
