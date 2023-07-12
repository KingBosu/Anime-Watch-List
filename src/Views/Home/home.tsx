import React, { useEffect, useState } from "react";

export default function Home() {
  const [animeList, setAnimeList] = useState([]);

  async function fetchAnimeData() {
    const url =
      "https://anime-db.p.rapidapi.com/anime?page=1&size=10&sortBy=ranking&sortOrder=asc";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "53fa483435msha52a2623cd2394dp10c938jsna77e657bc56c",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setAnimeList(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAnimeData();
  }, []);

  const showNextAnime = () => {
    setAnimeList((prevList) => [...prevList.slice(1), prevList[0]]);
  };

  useEffect(() => {
    const interval = setInterval(showNextAnime, 3000); // Auto move carousel every 3 seconds
    return () => clearInterval(interval);
  }, [animeList]);

  return (
    <div>
      <h1>Anime Watch List</h1>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {animeList.slice(0, 5).map((anime, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={anime._id}
            >
              <a href="#">
                <img
                  src={anime.image}
                  className="d-block w-100"
                  alt={anime.title}
                />
              </a>
              <div className="carousel-caption d-none d-md-block">
                <h5>{anime.title}</h5>
                <button className="btn btn-primary">Add to List</button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
