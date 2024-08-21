//Frontend/src/views/TeaCollectionView.tsx
import React, { useState, useEffect } from "react";
import TeaCard from "../components/TeaCard";
import axios from "axios";
import "../styles/TeaCollection.css";
import Carousel from "../components/Carousel";

// Gränssnitt för teobjekt
interface Tea {
  id: number;
  image_url: string;
  title: string;
  type: string;
  name: string;
  description: string;
  type_image_url: string;
}

// Huvudkomponent för te
const TeaCollectionView: React.FC = () => {
  // Tillstånd för att lagra teer och söktermen.
  const [teas, setTeas] = useState<Tea[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect för att hämta teer från servern när komponenten laddas
  useEffect(() => {
    const fetchTeas = async () => {
      try {
        const url = "http://localhost:5555/teas";
        const response = await axios.get(url);
        setTeas(response.data);
      } catch (error) {
        console.error("Error fetching teas:", error);
      }
    };

    fetchTeas();
  }, []);

  // Funktion för att hantera ändringar i sökfält
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Funktion för att rensa sökfält
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Visa "Extrahera" unika te-typer för karusellen.
  const teaTypes = Array.from(
    new Set(
      teas.map((tea) => ({
        id: tea.id.toString(),
        type: tea.type,
        image: tea.type_image_url,
        title: tea.title,
      }))
    )
  );

  // Filtrera teer baserat på sökterm
  const filteredTeas = teas.filter(
    (tea) =>
      tea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tea.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Tea Collection</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search teas..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && <button onClick={clearSearch}>Clear</button>}
      </div>
      {searchTerm && (
        <p className="search-results">
          - {filteredTeas.length} Result{filteredTeas.length !== 1 ? "s" : ""} Found -
        </p>
      )}

      <Carousel teaTypes={teaTypes} />

      <div className="tea-collection">
        {filteredTeas.map((tea) => (
          <TeaCard key={tea.id} tea={tea} />
        ))}
      </div>
    </div>
  );
};

export default TeaCollectionView;
