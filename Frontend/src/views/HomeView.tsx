import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import Carousel from "../components/Carousel";

interface TeaType {
  id: string;
  type: string;
  image: string;
  title: string;
}

const HomeView: React.FC = () => {
  const [teaTypes, setTeaTypes] = useState<TeaType[]>([]);

  useEffect(() => {
    const fetchTeaTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5555/teas");
        const teaData = response.data as TeaType[];
        const uniqueTeaTypes = Array.from(
          new Set(
            teaData.map((tea: TeaType) => ({
              id: tea.id.toString(),
              type: tea.type,
              image: tea.image,
              title: tea.title,
            }))
          )
        );
        setTeaTypes(uniqueTeaTypes);
      } catch (error) {
        console.error("Error fetching teas:", error);
      }
    };

    fetchTeaTypes();
  }, []);

  return (
    <>
      <section className='intro-film'>
        <div className="video-container">
          <video autoPlay muted loop>
            <source src="/assets/video/girlDrickingTea.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay">
            <div className="text">
              - RefinedBrewery -
            </div>
          </div>
        </div>
      </section>
      <div className="homeTextTitle">
        <h2>Welcome to</h2>
        <h1>RefinedBrewery</h1>
        <p>Explore our amazing collection of teas!</p>
        <Carousel teaTypes={teaTypes} />
      </div>
    </>
  );
};

export default HomeView;
