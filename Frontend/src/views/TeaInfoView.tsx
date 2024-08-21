// src/views/TeaInfoView.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/TeaInfo.css";
import Comments from "../components/CommentsInfo.tsx";

interface Tea {
  id: number;
  name: string;
  title: string;
  image_url: string;
  type: string;
  origin: string;
  description: string;
  properties: string;
  fragrance: string;
  history: string;
  how_to_brew: string;
}

const TeaInfoView: React.FC = () => {
  const [tea, setTea] = useState<Tea | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTea = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/teas/${id}`);
        setTea(response.data);
      } catch (error) {
        console.error("Error fetching tea:", error);
      }
    };

    fetchTea();
  }, [id]);

  if (!tea) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tea-info-view">
      {/* <TeaCard tea={tea} /> */}
      <h1>{tea.title}</h1>
      <img src={`${tea.image_url}`} alt={tea.name} className="tea-image-info" />
      <div className="tea-details">
        <p>{tea.description}</p>
        <section className="small-info-container">
          <p className="tea-origin-info">
            <strong>Origin: </strong>
            {tea.origin}
          </p>
          <p className="tea-type-info">
            <strong>Type: </strong>
            {tea.type}
          </p>
          <p className="tea-fragrance-info">
            <strong>Fragrance: </strong>
            {tea.fragrance}
          </p>
        </section>
        <p>
          <strong>Properties:</strong> {tea.properties}
        </p>
        <p>
          <strong>History/Lore:</strong> {tea.history}
        </p>
        <p>
          <strong>Brewing Instructions:</strong> {tea.how_to_brew}
        </p>
      </div>
      <Comments teaId={tea.id} />
    </div>
  );
};

export default TeaInfoView;
