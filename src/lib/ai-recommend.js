// lib/ai-recommend.js

export function generateAIInsights(hospital, userProfile) {
    const insights = [];
  
    // Pricing logic
    const priceNum = parseInt(hospital.price.replace(/[^0-9]/g, ""));
    if (priceNum < 1000) {
      insights.push("Great price point");
    } else if (priceNum > 2000) {
      insights.push("Higher than average cost");
    } else {
      insights.push("Fair market pricing");
    }
  
    // Distance
    const distNum = parseFloat(hospital.distance);
    if (distNum <= 2) {
      insights.push("Very close to your location");
    } else if (distNum > 5) {
      insights.push("Farther away – check for telehealth or closer options");
  
    }
  
    // Rating
    if (hospital.rating >= 4.5) {
      insights.push("Highly rated by other patients");
    } else if (hospital.rating < 3.5) {
      insights.push("Below average patient satisfaction");
    }
  
    // Insurance match
    if (hospital.insurance === "Accepted" && userProfile?.plan) {
      insights.push(`Accepts your plan (${userProfile.plan})`);
    } else {
      insights.push("Check if your plan is accepted");
    }
  
    return insights.join(". ") + ".";
  }
  
