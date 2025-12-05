import React, { useState } from "react";

const LAWN_OPTIONS = [
  { label: "Front Lawn", value: "front" },
  { label: "Back Lawn", value: "back" },
  { label: "Both Front and Back", value: "both" },
];

// Simulate basic lawn photo validation (files must include "lawn" in filename)
function validateLawnPhoto(file) {
  const isImage = file.type.startsWith("image/");
  const nameIncludesLawn = file.name.toLowerCase().includes("lawn");
  return isImage && nameIncludesLawn;
}

function App() {
  const [grassLength, setGrassLength] = useState("");
  const [lawnType, setLawnType] = useState("front");
  const [photos, setPhotos] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [quote, setQuote] = useState(null);

  const onPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
      if (!validateLawnPhoto(file)) {
        setUploadError(
          "Only genuine lawn photos are allowed. Photos must have 'lawn' in the file name and be a .jpg/.png."
        );
        setPhotos([]);
        return;
      }
    }
    setUploadError("");
    setPhotos(files);
  };

  const handleQuote = () => {
    if (!grassLength || photos.length === 0) {
      setUploadError("Please enter grass length and upload genuine lawn photo(s).");
      return;
    }
    setUploadError("");
    // Basic calculation
    const basePrice = 20;
    const lengthFactor = Math.max(Number(grassLength) / 5, 1);
    const photoFactor = photos.length;
    const lawnFactor = lawnType === "both" ? 2 : 1;
    const total = basePrice * lengthFactor * lawnFactor + photoFactor * 5;
    setQuote(`Estimated Quote: $${total.toFixed(2)}`);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 440, margin: "auto" }}>
      <h2>Lawn Quoter</h2>
      <label>
        Grass Length (cm):{" "}
        <input
          type="number"
          min={1}
          max={100}
          value={grassLength}
          onChange={(e) => setGrassLength(e.target.value)}
        />
      </label>
      <br /><br />
      <label>
        Photos of Lawn (must be image with 'lawn' in file name):<br />
        <input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={onPhotoChange}
        />
      </label>
      <br />
      <div>
        <span>Lawn Type:&nbsp;</span>
        {LAWN_OPTIONS.map((opt) => (
          <label key={opt.value} style={{ marginRight: 12 }}>
            <input
              type="radio"
              name="lawnType"
              value={opt.value}
              checked={lawnType === opt.value}
              onChange={(e) => setLawnType(e.target.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {uploadError && (
        <div style={{ color: "red", marginTop: 10 }}>{uploadError}</div>
      )}
      <br />
      <button onClick={handleQuote}>Get Quote</button>
      {quote && (
        <div style={{ marginTop: 30, fontWeight: 600 }}>{quote}</div>
      )}
    </div>
  );
}

export default App;
