import React from "react";
import { Link } from "react-router-dom";
import "../styles/TeaCard.css";

interface Tea {
  id: number;
  image_url: string;
  title: string;
  name: string;
  type: string;
}

interface TeaCardProps {
  tea: Tea;
}

const TeaCard: React.FC<TeaCardProps> = ({ tea }) => {
  return (
    <div className="tea-card">
      <Link to={`/tea/${tea.id}`}>
        <img src={tea.image_url} alt={tea.name} className="tea-image" />
        <div className="tea-info">
          <h2 className="tea-title">{tea.title}</h2>
          <p className="tea-type">{tea.type}</p>
        </div>
      </Link>
    </div>
  );
};

export default TeaCard;
