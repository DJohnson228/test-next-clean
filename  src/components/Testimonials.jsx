const reviews = [
    {
      name: "Sarah J.",
      location: "Austin, TX",
      text: "Pellucid has completely changed the way I shop for healthcare. I found the best price for my MRI in minutes and saved hundreds. Every patient should have access to this tool!",
    },
    {
      name: "David R.",
      location: "Jackson, MS",
      text: "Finally, healthcare costs make sense. Pellucid gave me all the options, reviews, and even insurance breakdowns so I could make the right choice for my family.",
    },
    {
      name: "Amanda T.",
      location: "Atlanta, GA",
      text: "I was blown away by Pellucid’s ease of use and depth of information. Scheduling my procedure and verifying my insurance was seamless. Five stars!",
    },
    {
      name: "Michelle K.",
      location: "Nashville, TN",
      text: "Pellucid’s transparency is a game changer. No more hidden fees or confusing bills. I feel empowered and in control of my healthcare decisions.",
    },
    {
      name: "Mark L.",
      location: "Dallas, TX",
      text: "The AI recommendations and real-time comparisons helped me find a highly rated provider at a fraction of the cost. Pellucid is the future of healthcare.",
    },
  ];
  export default function Testimonials() {
    return (
      <section className="max-w-5xl mx-auto mt-20 mb-16">
        <h2 className="text-2xl font-bold text-cyan-800 mb-6 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-cyan-50 border-l-4 border-cyan-400 rounded-lg p-6 shadow flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="font-semibold text-cyan-900">{review.name}</span>
                <span className="text-xs text-gray-400">{review.location}</span>
              </div>
              <div className="text-cyan-700 text-base">{review.text}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  