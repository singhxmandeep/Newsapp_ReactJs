import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchArticles = async (pageNumber) => {
    try {
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=02a1cfc873484f6a9eb42167ce2fa5ed&page=${pageNumber}&pageSize=${props.pageSize}`;
      let response = await fetch(url);
      props.setProgress(30);
      let parsedData = await response.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Handle error state or notify user
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    fetchArticles(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.country, props.category, props.pageSize]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchMoreData = async () => {
    try {
      let nextPage = page + 1;
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=02a1cfc873484f6a9eb42167ce2fa5ed&page=${nextPage}&pageSize=${props.pageSize}`;
      let response = await fetch(url);
      let parsedData = await response.json();
      setArticles([...articles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more articles:", error);
      // Handle error state or notify user
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        NewsMonkey: Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  date={element.publishedAt}
                  author={element.author}
                  source={element.source?.name || "Unknown"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
