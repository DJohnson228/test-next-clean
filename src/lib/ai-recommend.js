// src/lib/ai-recommend.js

export function generateAIInsights(hospital, userProfile) {
  const insights = [];

  // Price
  const priceRaw = hospital?.price ?? "0";
  const priceNum = parseInt(priceRaw.replace(/[^0-9]/g, ""), 10);
  if (!isNaN(priceNum)) {
    if (priceNum < 1000) {
      insights.push("Great price point");
    } else if (priceNum > 2000) {
      insights.push("Higher than average cost");
    } else {
      insights.push("Fair market pricing");
    }
  }

  // Distance
  const distRaw = hospital?.distance ?? "0";
  const distNum = parseFloat(distRaw);
  if (!isNaN(distNum)) {
    if (distNum <= 2) {
      insights.push("Very close to your location");
    } else if (distNum > 5) {
      insights.push("Farther away – check for telehealth or closer options");
    } else {
      insights.push("Within a moderate range from you");
    }
  }

  // Rating
  const rating = hospital?.rating;
  if (typeof rating === "number") {
    if (rating >= 4.5) {
      insights.push("Highly rated by other patients");
    } else if (rating < 3.5) {
      insights.push("Below average patient satisfaction");
    }
  }

  // Insurance
  if (hospital?.insurance === "Accepted" && userProfile?.plan) {
    insights.push(`Accepts your plan (${userProfile.plan})`);
  } else {
    insights.push("Check if your plan is accepted");
  }

  return insights.join(". ") + ".";
}

