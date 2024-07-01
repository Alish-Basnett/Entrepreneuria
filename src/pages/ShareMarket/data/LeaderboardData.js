export const userCompany = {
  companyName: "Everest Ventures",
  valuation: 630000, // Example valuation, replace with your actual value
};

// Function to generate dynamic leaderboard data including the user's company
export const generateLeaderboardData = () => {
  const userRank = leaderboardData.findIndex(
    (data) => data.companyName === userCompany.companyName
  );

  // Clone the original leaderboardData to avoid mutating it
  const updatedLeaderboardData = [...leaderboardData];

  // If user's company is found, update its valuation in the leaderboard data
  if (userRank !== -1) {
    updatedLeaderboardData[userRank].valuation = userCompany.valuation;
  } else {
    // If user's company is not found, add it to the leaderboard data
    updatedLeaderboardData.push({
      rank: updatedLeaderboardData.length + 1, // Assign a new rank
      companyName: userCompany.companyName,
      valuation: userCompany.valuation,
    });
  }

  // Sort the leaderboard data based on valuation in descending order
  updatedLeaderboardData.sort((a, b) => b.valuation - a.valuation);

  // Update ranks based on the sorted order
  updatedLeaderboardData.forEach((company, index) => {
    company.rank = index + 1; // Adjust ranks based on sorted order
  });

  return updatedLeaderboardData;
};

// Initial leaderboard data without the user's company
export const leaderboardData = [
  { rank: 1, companyName: "Alpha Enterprises", valuation: 950000 },
  { rank: 2, companyName: "Gamma Corp", valuation: 750000 },
  { rank: 3, companyName: "Delta Innovations", valuation: 690000 },
  { rank: 4, companyName: "Epsilon Group", valuation: 640000 },
  { rank: 5, companyName: "Zeta Solutions", valuation: 590000 },
  { rank: 6, companyName: "Eta Technologies", valuation: 540000 },
  { rank: 7, companyName: "Theta Ventures", valuation: 510000 },
  { rank: 8, companyName: "Iota Systems", valuation: 480000 },
  { rank: 9, companyName: "Kappa Enterprises", valuation: 450000 },
];

// Function to calculate next rank cost based on user's valuation
export const calculateNextRankCost = (userValuation) => {
  const userRank = leaderboardData.findIndex(
    (data) => data.companyName === userCompany.companyName
  );
  if (userRank === -1) return null; // User not found in leaderboard data
  const nextRankIndex = userRank - 1;
  if (nextRankIndex < 0) return null; // No higher rank exists

  const nextRankValuation = leaderboardData[nextRankIndex].valuation;
  const difference = nextRankValuation - userValuation;

  return difference > 0 ? difference : null; // Return positive difference or null if no need to pay
};
