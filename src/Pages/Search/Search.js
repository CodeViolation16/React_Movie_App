import * as React from "react";
import "./Search.css"

import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../Components/SingleContent/SingleContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomPagination from "../../Components/Pagination/CustomPagination";

export default function Search() {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);
  const handleChange = (event, newType) => {
    setType(newType);
  };

  async function fetchSearch() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&include_adult=false`
    );
    setContent(response.data.results);
    // console.log(results);
    setNumOfPages(response.data.total_pages);
    // {"page":1,"results":[],"total_pages":1,"total_results":0}
  }
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);
  return (
    <>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          fullWidth
          id="fullWidth"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button style={{ marginLeft: 10 }} onClick={fetchSearch}>
          Search
        </button>
      </div>
      <div>
        <Tabs
          onChange={handleChange}
          value={type}
          indicatorColor="primary"
          textColor="primary"
          style={{ width: "50%", display: "flex", justifyContent: "center" }}
        >
          <Tab label="Search Movie" />
          <Tab label="Search TV Series" />
        </Tabs>
      </div>
      <div className="searchB">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}

        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </>
  );
}
