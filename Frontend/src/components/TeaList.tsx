// src/components/TeaList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TeaCard from "./TeaCard";
import "../styles/TeaList.css";

interface Tea {
  id: number;
  image_url: string;
  name: string;
  description: string;
  title: string;
  type: string;
}

const TeaList: React.FC = () => {
  const [teas, setTeas] = useState<Tea[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTeas = async () => {
      try {
        let url = `http://localhost:5555/teas`;
        if (searchTerm) {
          url += `?type=${searchTerm}`;
        }
        const response = await axios.get(url);
        setTeas(response.data);
      } catch (error) {
        console.error("Error fetching teas:", error);
      }
    };

    fetchTeas();
  }, [searchTerm]);

  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <h2>Tea List</h2>
      <div className="searchBarStyle">
        <input
          type="text"
          placeholder="Search teas..."
          value={searchTerm}
          onChange={handleSearchBar}
        />
        {searchTerm && (
          <button id="inputButtonFacts" onClick={clearSearch}>
            X
          </button>
        )}
      </div>
      <div className="teaContainer">
        {teas.map((tea) => (
          <TeaCard key={tea.id} tea={tea} />
        ))}
      </div>
    </div>
  );
};

export default TeaList;
