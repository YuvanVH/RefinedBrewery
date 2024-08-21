// Frontend/src/views/TeaTypeViews/YellowTeaView.tsx
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

const YellowTeaView: React.FC = () => {
  const [teas, setTeas] = useState<Tea[]>([]);

  useEffect(() => {
    fetch('http://localhost:5555/teas?type=Yellow tea')
      .then(response => response.json())
      .then(data => setTeas(data))
      .catch(error => console.error('Error fetching Yellow tea:', error));
  }, []);

  return (
    <div>
      <h1>Yellow Tea</h1>
      <img src={`/assets/TeaTypesPictures/yellow.jpg`} alt='yellowtea image' className='teaTypeImage' />

      {teas.map(tea => (
        <div key={tea.id}>
          <h2>{tea.title}</h2>
          <p>{tea.description}</p>
        </div>
      ))}
    </div>
  );
};

export default YellowTeaView;
