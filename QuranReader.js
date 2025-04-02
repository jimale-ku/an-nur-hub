import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./kaaba.jpg"; // Import the background image
import titleImage from "./bismillah.jpg"; // Import the title image

const QuranReader = () => {
  const [surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) {
          throw new Error("Failed to fetch surahs");
        }
        const data = await response.json();
        setSurahs(data.data); // Fetching all 114 Surahs
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter((surah) =>
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed", // Background image stays still
        backgroundSize: "cover", // Ensure the image covers the whole background
        minHeight: "100vh", // Full viewport height
      }}
    >
      {/* Title Image */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img
          src={titleImage}
          alt="Bismillah"
          style={{
            width: "100%",
            maxWidth: "600px",
            objectFit: "contain",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Search Input */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search Surah..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            width: "80%",
            maxWidth: "400px",
          }}
        />
      </div>

      {/* Surah List */}
      <div style={{ padding: "40px 20px" }}>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            listStyleType: "none",
            margin: "0",
            padding: "0",
            textAlign: "center",
            color: "white",
          }}
        >
          {filteredSurahs.map((surah) => (
            <li
              key={surah.number}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                transform: "scale(1)",
              }}
              className="surah-item"
            >
              <Link
                to={`/surah/${surah.number}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "block",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  transition: "all 0.3s ease-in-out",
                }}
                className="surah-link"
              >
                {surah.englishName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuranReader;
