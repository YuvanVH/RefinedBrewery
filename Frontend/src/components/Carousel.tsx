// Frontend/src/components/Carousel.tsx
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Carousel.css";

interface TeaType {
  id: string;
  type: string;
  image: string;
  title: string;
}

// Def props för karusellkomponent
interface CarouselProps {
  teaTypes: TeaType[];
}

// Def karusellkomponenten
const Carousel: React.FC<CarouselProps> = ({ teaTypes }) => {
  // Filtrera och ta ut de unika te-typerna
  const uniqueTeaTypes = Array.from(new Set(teaTypes.map(tea => tea.type))).slice(0, 7);

  // Def tillstånd för sida i karusellen
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Initial antal items per sida
  const carouselRef = useRef<HTMLDivElement>(null);

  // Funktion för att räkna ut items per sida beroende på skärmstorlek
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 600) {
        setItemsPerPage(1);
      } else if (window.innerWidth <= 900) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage(); // Kör en gång för att sätta värdet vid första renderingen

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Def antal sidor i karusellen baserat på antalet te-sorter
  const totalPages = Math.ceil(uniqueTeaTypes.length / itemsPerPage);

  // Funktion för att hantera nästa sida i karusellen
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Funktion för att hantera förra sidan
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="carousel-container">
      {/* Knapp för att gå till föregående sida */}
      <button onClick={handlePrev} disabled={currentPage === 0}>
        Prev
      </button>

      <div className="carousel" ref={carouselRef}>
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {/* Loopa igenom och rendera varje unik te-typ */}
          {uniqueTeaTypes.map((type, index) => (
            <div className="carousel-item" key={index}>
              {/* Länk till specifik sida för varje te-typ */}
              <Link to={`/tea-type/${type.toLowerCase().replace(/\s+tea/g, "")}`}>
                <img src={`/assets/TeaTypesPictures/${type.toLowerCase().replace(/\s+tea/g, "")}.jpg`} alt={type} className="carousel-image" />
                <p className="carousel-title">{type}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Knapp för att gå till nästa sida */}
      <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
