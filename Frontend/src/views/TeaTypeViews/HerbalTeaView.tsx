import React, { useEffect, useState } from 'react';
import "../../styles/TeaTypes.css";

interface Tea {
  id: string;
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

const HerbalTeaView: React.FC = () => {
  const [teas, setTeas] = useState<Tea[]>([]);

  useEffect(() => {
    fetch('http://localhost:5555/teas?type=Herbal tea')
      .then(response => response.json())
      .then(data => setTeas(data))
      .catch(error => console.error('Error fetching Herbal tea:', error));
  }, []);

  return (
    <div>
      <h1>Herbal Tea</h1>
      {teas.map(tea => (
        <div key={tea.id}>
          <h2>{tea.title}</h2>
          <img src={`tea-images/${tea.type.toLowerCase().replace(' ', '-')}.jpg`} alt={tea.title} />
          <p>{tea.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HerbalTeaView;
