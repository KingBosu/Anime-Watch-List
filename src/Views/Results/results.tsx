import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Anime {
  _id: string;
  title: string;
  ranking: number;
  // Other properties
}

interface ResultsProps {
  searchTitle: string;
}

function Results() {
  const { searchTitle } = useParams<ResultsProps>();
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://anime-db.p.rapidapi.com/anime',
          {
            params: {
              page: '1',
              size: '10',
              search: searchTitle,
              genres: null,
              sortBy: 'ranking',
              sortOrder: 'asc',
            },
            headers: {
              'X-RapidAPI-Key': '53fa483435msha52a2623cd2394dp10c938jsna77e657bc56c',
              'X-RapidAPI-Host': 'anime-db.p.rapidapi.com',
            },
          }
        );
        setAnimeList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTitle]);

  return (
    <div>
      <h1>Results Page</h1>
      {animeList.map((anime) => (
        <div key={anime._id}>
          <h3>{anime.title}</h3>
          <p>Ranking: {anime.ranking}</p>
          {/* Render other anime details */}
        </div>
      ))}
    </div>
  );
}

export default Results;
