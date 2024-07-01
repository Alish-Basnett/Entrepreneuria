import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import { generateLeaderboardData, userCompany } from "../data/LeaderboardData";
import first from "../../../assets/images/first-trophy.png";
import second from "../../../assets/images/second-trophy.png";
import third from "../../../assets/images/third-trophy.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Leaderboard = () => {
  const [sortOrder, setSortOrder] = useState("desc"); // Initial sorting order (descending)
  const [sortedData, setSortedData] = useState([]);

  // Function to toggle sorting order and update sorted data
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    const sorted = [...generateLeaderboardData(userCompany)].sort((a, b) => {
      if (newOrder === "asc") {
        return a.valuation - b.valuation;
      } else {
        return b.valuation - a.valuation;
      }
    });
    setSortedData(sorted);
  };

  useEffect(() => {
    // Initialize sorted data on component mount
    const sorted = [...generateLeaderboardData(userCompany)].sort(
      (a, b) => b.valuation - a.valuation
    );
    setSortedData(sorted);
  }, []);

  useEffect(() => {
    // Update sorted data and highlight user's row when sortOrder or userCompany changes
    const updatedData = generateLeaderboardData(userCompany)
      .map((company) => ({
        ...company,
        isCurrentUser: company.companyName === userCompany.companyName,
      }))
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.valuation - b.valuation;
        } else {
          return b.valuation - a.valuation;
        }
      });
    setSortedData(updatedData);
  }, [sortOrder, userCompany]); // Ensure useEffect runs whenever sortOrder or userCompany changes

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Company Name</th>
            <th>
              <button className="valuation-button" onClick={toggleSortOrder}>
                Valuation
                {sortOrder === "desc" ? (
                  <FontAwesomeIcon icon={faCaretDown} className="icon" />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} className="icon" />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((company, index) => (
            <tr
              key={index}
              className={`leaderboard-item ${
                company.isCurrentUser ? "current-user" : ""
              }`}
              style={
                company.isCurrentUser ? { backgroundColor: "#ffff99" } : {}
              }
            >
              <td className="rank">
                {index === 0 && (
                  <img className="trophy-icon" src={first} alt="Gold Trophy" />
                )}
                {index === 1 && (
                  <img
                    className="trophy-icon"
                    src={second}
                    alt="Silver Trophy"
                  />
                )}
                {index === 2 && (
                  <img
                    className="trophy-icon"
                    src={third}
                    alt="Bronze Trophy"
                  />
                )}
                {index > 2 && <span>{index + 1}</span>}
              </td>
              <td className="company-name">{company.companyName}</td>
              <td className="valuation">${company.valuation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
