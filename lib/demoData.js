export const demoArticles = [
  {
    title: "Scientists Discover Water on Mars",
    url: "https://nasa.gov/mars-water",
    verdict: "REAL",
    score: 92,
    reason: "Credible source, peer-reviewed study, corroborated by multiple outlets.",
  },
  {
    title: "5G Towers Causing COVID-19, Says Doctor",
    url: "https://fakenewssite.com/5g-covid",
    verdict: "FAKE",
    score: 4,
    reason: "No scientific evidence. Source is known misinformation spreader.",
  },
  {
    title: "Government Plans to Tax WhatsApp Messages",
    url: "https://viralstory.in/whatsapp-tax",
    verdict: "MISLEADING",
    score: 28,
    reason: "Partially true bill exists but details are heavily distorted.",
  },
  {
    title: "New Diet Pill Burns Fat Overnight — Doctors Hate This",
    url: "https://healthscam.net/fat-pill",
    verdict: "FAKE",
    score: 2,
    reason: "Clickbait headline, no citations, product has no medical approval.",
  },
  {
    title: "India GDP Grows 7.2% in Q3 2024",
    url: "https://economictimes.com/gdp-q3",
    verdict: "REAL",
    score: 88,
    reason: "Published by reputed financial newspaper, government data cited.",
  },
];

// Simulate API call with demo data
export function analyzeDemoArticle(inputText) {
  const lower = inputText.toLowerCase();

  // Keyword-based simple demo matching
  if (lower.includes('5g') || lower.includes('vaccine') || lower.includes('miracle'))
    return demoArticles[1]; // FAKE
  if (lower.includes('mislead') || lower.includes('whatsapp') || lower.includes('tax'))
    return demoArticles[2]; // MISLEADING
  if (lower.includes('nasa') || lower.includes('mars') || lower.includes('gdp'))
    return demoArticles[4]; // REAL

  // Random fallback from demo pool
  return demoArticles[Math.floor(Math.random() * demoArticles.length)];
}