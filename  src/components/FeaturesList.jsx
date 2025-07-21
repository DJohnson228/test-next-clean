const featuresNow = [
    "Advanced Search: Find procedures and providers by ZIP code, specialty, or location.",
    "Transparent Pricing: Access real hospital/provider rates.",
    "Insurance Verification: Upload insurance, see personalized costs.",
    "Real-Time Scheduling & Management.",
    "Patient Reviews & Ratings.",
    "PDF Export.",
    "Analytics Dashboard.",
    "User Profile Management.",
  ];
  const featuresSoon = [
    "AI Recommendation Engine.",
    "Telehealth Integration.",
    "Provider Lookup & Credentialing.",
    "Employer Dashboard.",
    "Favorites & Comparison View.",
    "CMS File Ingest & Audit Tools.",
    "Excel Export.",
    "Personalized Home Dashboard.",
    "Provider Telehealth Widget.",
    "Testimonials & Trust Signals.",
    "Admin Monitoring & Controls.",
    "Accessibility & Localization.",
  ];
  
  export default function FeaturesList() {
    return (
      <section className="max-w-5xl mx-auto my-16">
        <h2 className="text-xl font-bold text-cyan-800 mb-2">Features</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="font-semibold mb-2 text-cyan-700">Core Features (Available Now):</h3>
            <ul className="list-disc pl-6 text-cyan-900">
              {featuresNow.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2 text-cyan-700">Coming Soon:</h3>
            <ul className="list-disc pl-6 text-cyan-900">
              {featuresSoon.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
  