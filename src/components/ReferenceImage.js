import React, { useState } from "react";
import "./ReferenceImage.css"; // Import styles

const ReferenceImage = () => {
  const [selectedPart, setSelectedPart] = useState(null);

  // Example parts of a 3D object
  const parts = [
    { id: 1, name: "Part 1", x: 50, y: 100 },
    { id: 2, name: "Part 2", x: 200, y: 150 },
  ];

  // Function to handle click
  const handleClick = (partId) => {
    console.log(`Clicked on part: ${partId}`);
    setSelectedPart(partId); // Update state to re-render component
  };

  return (
    <div className="reference-container">
      {/* Reference 2D Image */}
      <img src="/images/reference.jpg" alt="Reference" className="reference-img" />

      {/* Clickable Parts */}
      {parts.map((part) => (
  <div
    key={part.id}
    className="part-marker"
    style={{
      left: `${part.x}px`,
      top: `${part.y}px`,
      width: "15px", // Fixed size
      height: "15px",
      borderRadius: "50%",
      backgroundColor: selectedPart === part.id ? "blue" : "red",
      position: "absolute",
      transform: "translate(-50%, -50%)", // Keep centered
    }}
    onClick={() => handleClick(part.id)}
  ></div>
))}

    </div>
  );
};

export default ReferenceImage;
