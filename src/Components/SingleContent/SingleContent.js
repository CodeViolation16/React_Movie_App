import React from "react";
import { img_300, unavailable } from "../../Config/Config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

import Badge from "@mui/material/Badge";

const SingleContent = ({
  id,
  poster,
  title,
  data,
  media_type,
  vote_average,
  date,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <div className="media">
        <Badge
          badgeContent={vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          atl={title}
        />
        <b className="title">{title} </b>
        <span className="subtitle">
          {media_type === "tv" ? "TV Series" : "Movie"}{" "}
        </span>
        <span className="subtitle">{date}</span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
