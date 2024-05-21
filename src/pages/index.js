import { useState } from "react";

const GuessPerson = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Fetch data from the APIs
    const [ageRes, genderRes, countryRes] = await Promise.all([
      fetch(`https://api.agify.io?name=${name}`),
      fetch(`https://api.genderize.io?name=${name}`),
      fetch(`https://api.nationalize.io?name=${name}`),
    ]);

    const ageData = await ageRes.json();
    const genderData = await genderRes.json();
    const countryData = await countryRes.json();

    // Combine the results
    setResult({
      age: ageData.age,
      gender: genderData.gender,
      country: countryData.country,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Enter the Name to Guess the Age, Gender, and Country</h1>
      <form onSubmit={handleSubmit}>
        <input
          pattern="[a-zA-Z]*"
          type="text"
          placeholder="Enter a name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <button
          type="submit"
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          Submit
        </button>
      </form>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Age: {result.age}</p>
          <p>Gender: {result.gender}</p>
          <p>Country: {result.country.map((c) => c.country_id).join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default GuessPerson;
