import React from "react";
import axios from "axios";
import "./Trending.css";
import { useState, useEffect } from "react";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";
// import SearchBar from "../../Components/SearchBar";
function Trending() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  async function fetchTrending() {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

    setContent(data.results);
    console.log(data);
  }

  useEffect(() => {
    fetchTrending();
  }, [page]);

  async function fetchSearching() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
    console.log(data);
  }

  return (
    <div>
      <span className="pageTitle">Trending</span>
      {/* <SearchBar searchText={searchText} setSearchText={setSearchText} /> */}
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending;
