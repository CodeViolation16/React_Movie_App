import React, { useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";

function Genres({
  type,
  selectedGenres,
  genres,
  setGenres,
  setSelectedGenres,
  setPage,
}) {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
      // Optionally handle the error or setGenres([]) if needed
    }
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
  }, []); // Added an empty dependency array to run the effect only once

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{
              backgroundColor: "primary",
              margin: 2,
            }}
            key={genre.id}
            label={genre.name}
            clickable
            size="small"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{
              backgroundColor: "white",
              margin: 2,
            }}
            key={genre.id}
            label={genre.name}
            clickable
            onClick={() => handleAdd(genre)}
            size="small"
          />
        ))}
    </div>
  );
}

export default Genres;
