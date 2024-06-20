// NewsItem.js

import React, { useState, useEffect } from "react";
import "./card.css"; // Import your CSS file

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const NewsItem = (props) => {
  const [randomImageUrl, setRandomImageUrl] = useState(null);

  useEffect(() => {
    async function fetchRandomImage() {
      const apiUrl = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`;
      console.log("Fetching image from:", apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const data = await response.json();
        console.log("Fetched image data:", data);
        setRandomImageUrl(data.urls.regular);
      } catch (error) {
        console.error("Error fetching random image:", error);
      }
    }

    fetchRandomImage();
  }, []);

  let { title, description, imageUrl, newsUrl, date, author, source } = props;

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: 0,
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={
            imageUrl ||
            randomImageUrl ||
            "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="card-img-top"
          alt="news"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
